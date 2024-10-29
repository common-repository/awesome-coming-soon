(function($) {
    'use strict';

    let editor;

    $(document).ready(function() {
        // Tab switching
        $('.acs-tabs a').on('click', function(e) {
            e.preventDefault();
            var target = $(this).attr('href');

            $('.acs-tabs a').removeClass('acs-tab-active');
            $(this).addClass('acs-tab-active');

            $('.acs-tab-content').hide();
            $(target).show();
        });

        // Show the first tab content by default
        $('.acs-tab-content:first').show();

        // Function to toggle Coming Soon Mode options
        function toggleComingSoonMode() {
            var isEnabled = $('#acs_enabled').is(':checked');
            $('.acs-field-wrapper:has([name="acs_options[acs_display_mode]"])').toggle(isEnabled);
        }

        // Initial toggle on page load
        toggleComingSoonMode();

        // Listen for changes on the Coming Soon Mode checkbox
        $('#acs_enabled').on('change', toggleComingSoonMode);

        // Function to toggle logo options visibility
        function toggleLogoOptions() {
            var isLogoEnabled = $('#acs_logo_enabled').is(':checked');
            $('.acs-field-wrapper:has([name="acs_options[acs_logo_type]"])').toggle(isLogoEnabled);
            toggleLogoTypeFields();
        }

        // Function to toggle logo type fields visibility
        function toggleLogoTypeFields() {
            var isLogoEnabled = $('#acs_logo_enabled').is(':checked');
            var logoType = $('input[name="acs_options[acs_logo_type]"]:checked').val();

            $('.acs-field-wrapper:has([name="acs_options[acs_logo_text]"])').toggle(isLogoEnabled && logoType === 'text');
            $('.acs-field-wrapper:has([name="acs_options[acs_logo_image]"])').toggle(isLogoEnabled && logoType === 'image');
        }

        // Initial toggle on page load
        toggleLogoOptions();

        // Listen for changes on the logo enable checkbox
        $('#acs_logo_enabled').on('change', toggleLogoOptions);

        // Listen for changes on the logo type radio buttons
        $('input[name="acs_options[acs_logo_type]"]').on('change', toggleLogoTypeFields);

        // Background type functionality
        function toggleBackgroundOptions() {
            var selectedType = $('#acs_background_type').val();
            $('.acs-field-wrapper:has([name="acs_options[acs_background_color]"])').toggle(selectedType === 'color');
            $('.acs-field-wrapper:has([name="acs_options[acs_gradient_start]"], [name="acs_options[acs_gradient_end]"], [name="acs_options[acs_gradient_direction]"])').toggle(selectedType === 'gradient');
            $('.acs-field-wrapper:has([name="acs_options[acs_background_image]"])').toggle(selectedType === 'image');
            $('.acs-field-wrapper:has([name="acs_options[acs_background_video]"])').toggle(selectedType === 'video');
        }

        $('#acs_background_type').on('change', toggleBackgroundOptions);
        toggleBackgroundOptions(); // Initial toggle on page load

        // Countdown Timer Setup
        function toggleCountdownFields() {
            var isEnabled = $('#acs_countdown_enabled').is(':checked');
            $('.acs-field-wrapper:has([name="acs_options[acs_countdown_date]"], [name="acs_options[acs_countdown_action]"])').toggle(isEnabled);
            toggleCountdownAction();
        }

        function toggleCountdownAction() {
            var isEnabled = $('#acs_countdown_enabled').is(':checked');
            var action = $('#acs_countdown_action').val();
            $('.acs-field-wrapper:has([name="acs_options[acs_countdown_redirect_url]"])').toggle(isEnabled && action === 'url_redirect');
        }

        $('#acs_countdown_enabled').on('change', toggleCountdownFields);
        $('#acs_countdown_action').on('change', toggleCountdownAction);
        toggleCountdownFields(); // Initial toggle on page load

        // Image upload functionality
        $('.acs-upload-image-button').on('click', function(e) {
            e.preventDefault();
            var button = $(this);
            var image = wp.media({
                title: 'Upload Image',
                multiple: false
            }).open().on('select', function(e){
                var uploaded_image = image.state().get('selection').first();
                var image_url = uploaded_image.toJSON().url;
                button.siblings('input[type="hidden"]').val(image_url);
                button.siblings('.acs-image-preview').html('<img src="' + image_url + '" style="max-width:200px;">');
            });
        });

        // Initialize color pickers
        $('.acs-color-picker').wpColorPicker({
            change: function(event, ui) {
               // updateColorPreview();
            }
        }); 

        // Initialize datepicker
        $('.acs-datepicker').datepicker({
            dateFormat: 'MM dd, yy',
            changeMonth: true,
            changeYear: true
        });

        // AJAX form submission
        $('.acs-save-changes').on('click', function(e) {
            e.preventDefault();
            var form = $(this).closest('form');
            var form_data = form.serialize();

            $.ajax({
                url: acsData.ajaxurl,
                type: 'POST',
                data: {
                    action: 'acs_save_options',
                    security: acsData.nonce,
                    form_data: form_data
                },
                success: function(response) {
                    if (response.success) {
                        showNotification('Settings saved successfully');
                    } else {
                        showNotification('Error saving settings: ' + (response.data ? response.data : 'Unknown error'), 'error');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error('AJAX error:', textStatus, errorThrown);
                    showNotification('An error occurred while saving settings: ' + textStatus, 'error');
                }
            });
        });

        // Google Fonts functionality
        var googleFonts = [
            { family: 'Poppins', variants: ['400', '500', '600', '700', '800', '900'] },
            { family: 'Muli', variants: [ '300', '400', '500', '600', '700', '800', '900'] },
            { family: 'Roboto', variants: [ '300', '400', '500', '700', '900'] },
            { family: 'Playfair Display', variants: ['400', '500', '600', '700', '800', '900'] },
            { family: 'Lato', variants: ['300', '400', '700', '900'] },
            { family: 'Montserrat', variants: [ '200', '300', '400', '500', '600', '700', '800', '900'] },
            { family: 'Dosis', variants: [ '300', '400', '500', '600', '700', '800'] },
            { family: 'Cabin', variants: ['400', '500', '600', '700'] },
            { family: 'Sawarabi Mincho', variants: ['400'] },
            { family: 'Ubuntu', variants: ['300', '400', '500', '700'] }
        ];

        initializeFontSelects();

        function initializeFontSelects() {
            populateFontSelects();
            $('.acs-google-font-select').each(function() {
                updateFontVariants($(this));
            });
            updateFontPreview();
        }
        
        function initializeFontSelects() {
            populateFontSelects();
            $('.acs-google-font-select').each(function() {
                updateFontVariants($(this));
            });
            updateFontPreview();
        }

        function populateFontSelects() {
            var $selects = $('.acs-google-font-select');
            
            googleFonts.forEach(function(font) {
                $selects.each(function() {
                    var $select = $(this);
                    $select.append($('<option>', {
                        value: font.family,
                        text: font.family
                    }));
                });
            });
        }

        function populateVariants($fontSelect, $variantSelect) {
            var selectedFont = $fontSelect.val();
            var font = googleFonts.find(f => f.family === selectedFont);
            
            //$variantSelect.empty();
            if (font) {
                font.variants.forEach(function(variant) {
                    $variantSelect.append($('<option>', {
                        value: variant,
                        text: variant
                    }));
                });
            }
            $variantSelect.trigger('change');
        }
        
        function updateFontVariants($fontSelect) {
            var selectedFont = $fontSelect.val();
            var $variantSelect = $fontSelect.closest('.acs-font-section').find('.acs-font-variant-select');
            
            if ($variantSelect.length === 0) {
                return;
            }

            var currentVariant = $variantSelect.val();
            var font = googleFonts.find(f => f.family === selectedFont);

            if (font && font.variants) {
                $variantSelect.empty();

                font.variants.forEach(function(variant) {
                    $variantSelect.append($('<option>', {
                        value: variant,
                        text: variant
                    }));
                });

                if (font.variants.includes(currentVariant)) {
                    $variantSelect.val(currentVariant);
                } else {
                    $variantSelect.val(font.variants[0]);
                }
            }

            $variantSelect.trigger('change');
        }
        
        // Event listeners for font customization
        $(document).on('change', '.acs-google-font-select', function() {
            updateFontVariants($(this));
            updateFontPreview();
        });

        $('.acs-font-section select, .acs-font-section input[type="range"]').on('change input', function() {
            updateFontPreview();
        });
        
        $('.acs-font-settings input[type="range"]').on('input', function() {
            var $this = $(this);
            var value = $this.val();
            var $valueDisplay = $this.siblings('label').find('span');

            if ($valueDisplay.length) {
                if ($this.hasClass('acs-font-size-slider') || $this.hasClass('acs-letter-spacing-slider')) {
                    $valueDisplay.text(value + 'px');
                } else if ($this.hasClass('acs-line-height-slider')) {
                    $valueDisplay.text(value);
                }
            }

            updateFontPreview();
        });


        function updateFontPreview() {
            var headingFont = $('select[name="acs_options[acs_heading_font_family]"]').val();
            var headingVariant = $('select[name="acs_options[acs_heading_font_variant]"]').val();
            var headingSize = $('input[name="acs_options[acs_heading_font_size]"]').val();
            var headingLetterSpacing = $('input[name="acs_options[acs_heading_letter_spacing]"]').val();
            var headingLineHeight = $('input[name="acs_options[acs_heading_line_height]"]').val();
        
            var bodyFont = $('select[name="acs_options[acs_body_font_family]"]').val();
            var bodyVariant = $('select[name="acs_options[acs_body_font_variant]"]').val();
            var bodySize = $('input[name="acs_options[acs_body_font_size]"]').val();
            var bodyLetterSpacing = $('input[name="acs_options[acs_body_letter_spacing]"]').val();
            var bodyLineHeight = $('input[name="acs_options[acs_body_line_height]"]').val();
        
            WebFont.load({
                google: {
                    families: [headingFont + ':' + headingVariant, bodyFont + ':' + bodyVariant]
                },
                active: function() {
                    $('#acs-preview-heading').css({
                        'font-family': "'" + headingFont + "', sans-serif",
                        'font-weight': headingVariant,
                        'font-size': headingSize + 'px',
                        'letter-spacing': headingLetterSpacing + 'px',
                        'line-height': headingLineHeight
                    });
        
                    $('#acs-preview-body').css({
                        'font-family': "'" + bodyFont + "', sans-serif",
                        'font-weight': bodyVariant,
                        'font-size': bodySize + 'px',
                        'letter-spacing': bodyLetterSpacing + 'px',
                        'line-height': bodyLineHeight
                    });
                }
            });
        }


        // Call updateFontPreview on page load
        updateFontPreview();

        $('.acs-font-section input[type="range"]').each(function() {
            var $this = $(this);
            var $valueDisplay = $this.siblings('.acs-range-value');
            
            function updateValue() {
                var value = $this.val();
                var unit = $this.hasClass('acs-line-height-slider') ? '' : 'px';
                $valueDisplay.text(value + unit);
            }
        
            updateValue(); // Initial update
            $this.on('input', updateValue);
        });

        // Social Media functionality
        const socialIconsGrid = $('#acs-social-icons-grid');
        const socialIconsFields = $('#acs-social-icons-fields');

        // Handle icon selection
        socialIconsGrid.on('click', '.acs-social-icon', function() {
            const icon = $(this).data('icon');
            if ($(this).hasClass('acs-selected')) {
                $(this).removeClass('acs-selected');
                removeSocialField(icon);
            } else {
                $(this).addClass('acs-selected');
                addSocialField(icon);
            }
        });

        // Function to add a social media field
        function addSocialField(icon, url = '') {
            let placeholder = `https://${icon}.com/profile`;
            let iconClass = `fab fa-${icon}`;

            // Special cases
            switch(icon) {
                case 'email':
                    placeholder = 'email@example.com';
                    iconClass = 'fas fa-envelope';
                    break;
                case 'phone':
                    placeholder = '+1234567890';
                    iconClass = 'fas fa-phone';
                    break;
                // Add other special cases here
            }

            const field = `
                <div class="acs-social-field" data-icon="${icon}">
                    <label>
                        <i class="${iconClass}"></i> ${icon.charAt(0).toUpperCase() + icon.slice(1)}
                    </label>
                    <input type="text" name="acs_social_media[${icon}]" value="${url}" placeholder="${placeholder}">
                    <span class="acs-social-remove">×</span>
                </div>
            `;
            socialIconsFields.append(field);
        }

        // Function to remove a social media field
        function removeSocialField(icon) {
            socialIconsFields.find(`[data-icon="${icon}"]`).remove();
        }

        // Handle removal of social media fields
        socialIconsFields.on('click', '.acs-social-remove', function() {
            const field = $(this).closest('.acs-social-field');
            const icon = field.data('icon');
            field.remove();
            socialIconsGrid.find(`[data-icon="${icon}"]`).removeClass('acs-selected');
        });

        // Make social media fields sortable
        socialIconsFields.sortable();

        // Ensure selected state on page load
        socialIconsFields.find('.acs-social-field').each(function() {
            const icon = $(this).data('icon');
            socialIconsGrid.find(`[data-icon="${icon}"]`).addClass('acs-selected');
        });
        
     /*   function updateColorPreview() {
            var accentColor = $('#acs_accent_color').val();
            var headingColor = $('#acs_heading_color').val();
            var bodyTextColor = $('#acs_body_text_color').val();
        
            $('#acs-preview-heading').css('color', headingColor);
            $('#acs-preview-body').css('color', bodyTextColor);
            // You can add more elements to update with the accent color if needed
        }

        updateColorPreview(); */

        // Modern notification function
        function showNotification(message, type = 'success') {
            // Remove any existing notifications
            $('.acs-notification').remove();

            // Create the notification element
            var notification = $('<div class="acs-notification acs-notification-' + type + '"></div>').text(message);

            // Append the notification to the body
            $('body').append(notification);

            // Show the notification
            setTimeout(function() {
                notification.addClass('acs-show');
            }, 10);

            // Hide the notification after 3 seconds
            setTimeout(function() {
                notification.removeClass('acs-show');
                setTimeout(function() {
                    notification.remove();
                }, 300);
            }, 3000);
        }

        // Call all toggle functions on page load to set initial state
        $(function() {
            toggleComingSoonMode();
            toggleLogoOptions();
            toggleBackgroundOptions();
            toggleCountdownFields();
         
            updateFontPreview();
        });

        // Range input value display
        $('.acs-font-settings input[type="range"]').each(function() {
            var $this = $(this);
            var $valueDisplay = $this.siblings('.acs-range-value');
            
            $valueDisplay.text($this.val() + ($this.hasClass('acs-line-height-slider') ? '' : 'px'));

            $this.on('input', function() {
                $valueDisplay.text($this.val() + ($this.hasClass('acs-line-height-slider') ? '' : 'px'));
            });
        });

        // WYSIWYG editor (if applicable)
        if (typeof tinymce !== 'undefined') {
            tinymce.init({
                selector: 'textarea.acs-wysiwyg',
                height: 300,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            });
        }

        // Handle tab navigation via URL hash
        function handleTabNavigation() {
            var hash = window.location.hash;
            if (hash) {
                $('.acs-tabs a[href="' + hash + '"]').click();
            }
        }

        // Call handleTabNavigation on page load and when the hash changes
        $(window).on('hashchange', handleTabNavigation);
        handleTabNavigation();

        // Confirm before resetting settings
        $('#acs-reset-settings').on('click', function(e) {
            if (!confirm('Are you sure you want to reset all settings to their default values? This action cannot be undone.')) {
                e.preventDefault();
            }
        });

        // Initialize clipboard functionality for shortcodes
        if (typeof ClipboardJS !== 'undefined') {
            new ClipboardJS('.acs-copy-shortcode');
        }

        // Preview functionality
        $('#acs-preview-button').on('click', function(e) {
            e.preventDefault();
            var previewUrl = $(this).data('preview-url');
            window.open(previewUrl, 'acs_preview', 'width=1024,height=768,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0');
        });

        // Dynamic field visibility based on other field values
        $('[data-depends-on]').each(function() {
            var $this = $(this);
            var dependencyField = $this.data('depends-on');
            var dependencyValue = $this.data('depends-value');

            $('input[name="acs_options[' + dependencyField + ']"], select[name="acs_options[' + dependencyField + ']"]').on('change', function() {
                var showField = ($(this).val() == dependencyValue);
                $this.toggle(showField);
            }).trigger('change');
        });

        const customCssTextarea = document.getElementById('acs_custom_css');
        if (customCssTextarea) {
            editor = CodeMirror.fromTextArea(customCssTextarea, {
                lineNumbers: true,
                mode: 'css',
                theme: 'dracula',
                lineWrapping: true,
                viewportMargin: Infinity,
                scrollbarStyle: 'native',
                indentUnit: 4,
                tabSize: 4,
                indentWithTabs: true,
                gutters: ["CodeMirror-linenumbers"],
                extraKeys: {"Alt-F": "findPersistent"}
            });

            // Refresh editor after initialization
            setTimeout(function() {
                editor.refresh();
            }, 1);

            // Update textarea before form submission
            editor.on('change', function() {
                editor.save();
            });
        }

        // Function to refresh CodeMirror
        function refreshCodeMirror() {
            if (editor) {
                editor.refresh();
            }
        }

        // Refresh CodeMirror when Advanced tab is clicked
        $('.acs-tabs a[href="#acs-advanced"]').on('click', function() {
            setTimeout(refreshCodeMirror, 0);
        });

        // If Advanced tab is active on page load, refresh CodeMirror
        if ($('#acs-advanced').is(':visible')) {
            setTimeout(refreshCodeMirror, 0);
        }


        $('input[name="acs_options[acs_theme]"]').on('change', function() {
            var selectedTheme = $(this).val();
            
            // Remove 'acs-active' class from all theme items
            $('.acs-theme-item').removeClass('acs-active');
            
            // Add 'acs-active' class to the selected theme item
            $(this).closest('.acs-theme-item').addClass('acs-active');

            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'acs_load_theme_defaults',
                    theme: selectedTheme,
                    security: acsData.nonce
                },
                success: function(response) {
                    if (response.success) {
                        // Update form fields with new default values
                        $.each(response.data, function(key, value) {
                            var $field = $('[name="acs_options[' + key + ']"]');
                            if ($field.length) {
                                if ($field.is('select')) {
                                    $field.val(value).trigger('change');
                                } else if ($field.is('input[type="radio"]')) {
                                    $field.filter('[value="' + value + '"]').prop('checked', true).trigger('change');
                                } else if ($field.is('input[type="checkbox"]')) {
                                    $field.prop('checked', value === '1').trigger('change');
                                } else {
                                    $field.val(value).trigger('change');
                                }
                            }

                            if (key === 'acs_background_image') {
                                updateImagePreview($field, value);
                            }
                        });

                        // Manually trigger background type change to ensure proper field visibility
                        toggleBackgroundOptions();

                        // Update color pickers
                        $('.acs-color-picker').each(function() {
                            $(this).wpColorPicker('color', $(this).val());
                        });

                     

                        // Update font selects
                        $('.acs-google-font-select').each(function() {
                            updateFontVariants($(this));
                        });

                        // Update font preview
                        updateFontPreview();

                        // Refresh CodeMirror if it's initialized
                        if (editor) {
                            editor.refresh();
                        }
                    }
                }
            });
        });

        function updateImagePreview($field, imageUrl) {
            var $previewContainer = $field.siblings('.acs-image-preview');
            if (imageUrl) {
                if ($previewContainer.length === 0) {
                    $previewContainer = $('<div class="acs-image-preview"></div>').insertAfter($field);
                }
                $previewContainer.html('<img src="' + imageUrl + '" style="max-width:200px;">');
            } else {
                $previewContainer.empty();
            }
        }
    
    });
})(jQuery);