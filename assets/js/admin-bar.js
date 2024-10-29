(function($) {
    'use strict';

    $(document).ready(function() {
        $("#wp-admin-bar-acs-admin-notice #acs-toggle-adminbar").on("click", function(e) {
            e.preventDefault();
            var $acs_this = $(this);
            var acs_current_status = $acs_this.attr("data-status");
            var acs_new_status = acs_current_status === "acs-on" ? "acs-off" : "acs-on";
            
            console.log('Current status:', acs_current_status);
            console.log('New status:', acs_new_status);
            
            $.ajax({
                url: acsData.ajaxurl,
                type: "POST",
                data: {
                    action: "acs_toggle_mode",
                    security: acsData.nonce,
                    status: acs_new_status
                },
                success: function(acs_response) {
                    console.log('AJAX Response:', acs_response);
                    if (acs_response.success) {
                        acs_update_toggle_state(acs_new_status);
                        acs_show_notification("Coming soon mode " + (acs_new_status === "acs-on" ? "enabled" : "disabled"), "success");
                    } else {
                        console.error('Error details:', acs_response.data);
                        acs_show_notification("Failed to update coming soon mode. Please check console for details.", "error");
                    }
                },
                error: function(xhr, status, error) {
                    console.log('AJAX Error:', status, error);
                    acs_show_notification("An error occurred. Please check console for details.", "error");
                }
            });
        });

        function acs_update_toggle_state(acs_new_status) {
            console.log('Updating toggle state to:', acs_new_status);
            var $acs_toggle = $("#wp-admin-bar-acs-admin-notice #acs-toggle-adminbar");
            var $acs_status = $("#wp-admin-bar-acs-admin-notice .acs-status");
            
            $acs_toggle
                .removeClass('acs-status-acs-on acs-status-acs-off')
                .addClass('acs-status-' + acs_new_status)
                .attr("data-status", acs_new_status);
            
            $acs_status
                .removeClass('acs-on acs-off')
                .addClass(acs_new_status)
                .text(acs_new_status === "acs-on" ? acsData.textOn : acsData.textOff);

            var $acs_settings_toggle = $('#acs_enabled');
            if ($acs_settings_toggle.length) {
                $acs_settings_toggle.prop('checked', acs_new_status === "acs-on");
            }
        }

        function acs_show_notification(acs_message, acs_type) {
            console.log('Notification:', acs_type, acs_message);
            var $notification = $('<div class="acs-notification acs-notification-' + acs_type + '">' + acs_message + '</div>');
            $('body').append($notification);
            setTimeout(function() {
                $notification.addClass('acs-show');
            }, 100);
            setTimeout(function() {
                $notification.removeClass('acs-show');
                setTimeout(function() {
                    $notification.remove();
                }, 300);
            }, 3000);
        }
    });

})(jQuery);