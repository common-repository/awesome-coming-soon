<?php

add_action( 'admin_init', 'acs_general_options_init' );
add_action( 'admin_init', 'acs_content_options_init' );
add_action( 'admin_init', 'acs_design_options_init' );
add_action( 'admin_menu', 'acs_admin_add' );
add_action( 'admin_enqueue_scripts', 'acs_add_stylesheet_to_admin' );



/**
 * Init plugin options to white list our options
 */
function acs_general_options_init(){
	register_setting( 'awesome_comingsoon_general', 'awesome_comingsoon_options_settings', 'acs_general_options_validate' );

}

function acs_content_options_init(){
	register_setting( 'awesome_comingsoon', 'awesome_comingsoon_options', 'acs_content_options_validate' );

}
function acs_design_options_init(){
	register_setting( 'awesome_comingsoon_design', 'awesome_comingsoon_design_options', 'acs_design_options_validate' );

}


 
    /**
     * Add stylesheet to the page
     */
    function acs_add_stylesheet_to_admin() {
    	wp_enqueue_media();
    	wp_enqueue_style( 'wp-color-picker' );
    	
        wp_enqueue_style( 'prefix-style', plugins_url('css/style.css', __FILE__) );
        wp_enqueue_script( 'prefix-style', plugins_url('js/scripts-admin.js', __FILE__) );
      //  wp_enqueue_script( 'prefix-style', plugins_url('js/jquery.js', __FILE__) );
         
       
       
    }

/**
 * Load up the menu page
 */




function acs_admin_add() {


	add_theme_page( __( 'Awesome Coming Soon Options', 'comingsoon' ), __( 'Awesome Coming Soon', 'comingsoon' ), 'edit_acs_options', 'acs_options', '' );
}
/**
 * Create arrays for our select and radio options
 */
$select_options = array(
	'0' => array(
		'value' =>	'color',
		'label' => __( 'Background Color', 'comingsoon' )
	),
	'1' => array(
		'value' =>	'image',
		'label' => __( 'Background Image', 'comingsoon' )
	)
	);

$radio_options = array(
	'enabled' => array(
		'value' => 'enabled',
		'label' => __( 'Enabled', 'comingsoon' )
	),
	'disabled' => array(
		'value' => 'disabled',
		'label' => __( 'Disabled', 'comingsoon' )
	)
);

/**
 * Create the options page
 */
function acs_admin_settings() {
	global $select_options, $radio_options;

	if ( ! isset( $_REQUEST['settings-updated'] ) )
		$_REQUEST['settings-updated'] = false;

	?>
	<div class="wrap">

			<h2 class="wpmm-title">Awesome Coming Soon</h2>
		
		<?php if ( false !== $_REQUEST['settings-updated'] ) : ?>
		<div class="updated fade"><p><strong><?php _e( 'Options saved', 'comingsoon' ); ?></strong></p></div>
		<?php endif; ?>

			<div class="nav-tab-wrapper">
                <a class="nav-tab nav-tab-active" href="#general">General Settings</a>
                 <a class="nav-tab" href="#content">Page Content</a>
                <a class="nav-tab" href="#design">Design Page</a>
               
            </div>



<div class="wpmm-wrapper">
        <div id="content" class="wrapper-cell">
            

            <div class="tabs-content">
                <div id="tab-general" class="">

                

                	<form method="post" id="genralform" action="options.php">
			<?php settings_fields( 'awesome_comingsoon_general' ); ?>
			<?php $options = get_option( 'awesome_comingsoon_options_settings' ); ?>

			<table class="form-table">



					<?php
				/**
				 * A sample of radio buttons
				 */
				?>
				<tr valign="top"><th scope="row"><?php _e( 'Coming Soon Mode', 'comingsoon' ); ?></th>
					<td>
						<fieldset><legend class="screen-reader-text"><span><?php _e( 'Radio buttons', 'comingsoon' ); ?></span></legend>
						<?php
							if ( ! isset( $checked ) )
								$checked = '';
							foreach ( $radio_options as $option ) {
								$radio_setting = $options['radioinput'];

								if ( '' != $radio_setting ) {
									if ( $options['radioinput'] == $option['value'] ) {
										$checked = "checked=\"checked\"";
									} else {
										$checked = '';
									}
								}
								?>
								<label class="description"><input type="radio" name="awesome_comingsoon_options_settings[radioinput]" value="<?php esc_attr_e( $option['value'] ); ?>" <?php echo $checked; ?> /> <?php echo $option['label']; ?></label><br />
								<?php
							}
						?>
						</fieldset>
					</td>
				</tr>
				<tr valign="top"><th scope="row"><?php _e( 'Footer Credits', 'comingsoon' ); ?></th>
					<td>
						<input id="awesome_comingsoon_options_settings[credits]" name="awesome_comingsoon_options_settings[credits]" type="checkbox" value="1" <?php checked( '1', $options['credits'] ); ?> />
						<label class="description" for="awesome_comingsoon_options_settings[credits]"><?php _e( 'Include plugin developer link', 'comingsoon' ); ?></label>
					</td>
				</tr>


			</table>

			<p class="submit">
				<input type="submit" name="awesome_comingsoon_save" class="button-primary" value="<?php _e( 'Save Options', 'comingsoon' ); ?>" />
			</p>
		</form>

<div id="saveResult"></div>

						<?php

							echo "<img src='" . plugin_dir_url(__FILE__) . "images/loading.gif' id='awesome_social_load'/>";

			?>

	<script type="text/javascript">

					jQuery(document).ready(function() {

					jQuery("#awesome_social_load").hide();

					jQuery('#genralform').submit(function(e) { 
							e.preventDefault();

					jQuery("#awesome_social_load").show();

					jQuery(this).ajaxSubmit({

                       

					success: function(){

					jQuery("#awesome_social_load").hide();

					jQuery('#saveResult').html("<div id='saveMessage' class='successModal'></div>");

					jQuery('#saveMessage').append("<p><?php

					echo htmlentities(__('Settings Saved Successfully', 'wp'), ENT_QUOTES);

					?></p>").show();

							 }, 

							 timeout:5000,
                error: function(data){
                 		jQuery("#awesome_social_load").hide();
                        
					jQuery('#saveResult').html("<div id='saveMessage' class='successModal'></div>");

					jQuery('#saveMessage').append("<p><?php

					echo htmlentities(__('Settings Saved Successfully', 'wp'), ENT_QUOTES);

					?></p>").show();
                    }
						  }); 

						  setTimeout("jQuery('#saveMessage').hide('slow');", 5000);

						  return false; 

					   });

					});

			</script>



<?php

?>
            
                </div>

                  <div id="tab-content" class="hidden">




				          	<form method="post" action="options.php" id="contenttab">
			<?php settings_fields( 'awesome_comingsoon' ); ?>
			<?php $options = get_option( 'awesome_comingsoon_options' ); ?>

			<table class="form-table">
			

				<?php
				/**
				 * A sample text input option
				 */
				?>
				<tr valign="top"><th scope="row"><?php _e( 'Page Title', 'comingsoon' ); ?></th>
					<td>
						<input id="awesome_comingsoon_options[title]" class="regular-text" type="text" name="awesome_comingsoon_options[title]" value="<?php if($options['title']) { esc_attr_e( $options['title'] ); } else{ esc_attr_e('Awesome Coming Soon') ;}; ?>" />
						<label class="description" for="awesome_comingsoon_options[title]"><?php _e( 'Html Title Tag ', 'comingsoon' ); ?></label>
					</td>
				</tr>

					<tr valign="top"><th scope="row"><?php _e( 'Page Heading', 'comingsoon' ); ?></th>
					<td>
						<input id="awesome_comingsoon_options[heading]" class="regular-text" type="text" name="awesome_comingsoon_options[heading]" value="<?php if($options['heading']) { esc_attr_e( $options['heading'] ); } else{ esc_attr_e('Awesome Coming Soon') ;}; ?>" />
						<label class="description" for="awesome_comingsoon_options[heading]"><?php _e( 'H1 Tag', 'comingsoon' ); ?></label>
					</td>
				</tr>



			
				

				<?php
				/**
				 * A sample textarea option
				 */
				?>
				<tr valign="top"><th scope="row"><?php _e( 'About Us Text', 'comingsoon' ); ?></th>
					<td>

						<?php if($options['abouttext']) { } 
						else{  $options['abouttext'] ='Hi, This is Awesome Coming Soon, A Great Website is Coming Soon! Stay Connected' ;} ?>
						
							<?php wp_editor(  $options['abouttext'] , 'desired_id_of_textarea', $settings = array('textarea_name'=>'awesome_comingsoon_options[abouttext]') ); ?> 
  							
  						

					</td>
				</tr>
</table>

			<p class="submit">
				<input type="submit" name="awesome_comingsoon_save" class="button-primary" value="<?php _e( 'Save Options', 'comingsoon' ); ?>" />
			</p>
		</form>





<div id="saveResult1"></div>

						<?php

							echo "<img src='" . plugin_dir_url(__FILE__) . "images/loading.gif' id='awesome_social_load1'/>";

			?>

	<script type="text/javascript">

					jQuery(document).ready(function() {

					jQuery("#awesome_social_load1").hide();

					jQuery('#contenttab1').submit(function(e) { 
							e.preventDefault();

					jQuery("#awesome_social_load1").show();

					jQuery(this).ajaxSubmit({

                       

					success: function(){

					jQuery("#awesome_social_load1").hide();

					jQuery('#saveResult1').html("<div id='saveMessage1' class='successModal'></div>");

					jQuery('#saveMessage1').append("<p><?php

					echo htmlentities(__('Settings Saved Successfully', 'wp'), ENT_QUOTES);

					?></p>").show();

							 }, 

							 timeout:5000,
                error: function(data){
                 		jQuery("#awesome_social_load1").hide();
                        
					jQuery('#saveResult1').html("<div id='saveMessage1' class='successModal'></div>");

					jQuery('#saveMessage1').append("<p><?php

					echo htmlentities(__('Settings Saved Successfully', 'wp'), ENT_QUOTES);

					?></p>").show();
                    }
						  }); 

						  setTimeout("jQuery('#saveMessage1').hide('slow');", 5000);

						  return false; 

					   });

					});

			</script>






                    
                </div>

                <div id="tab-design" class="hidden">
                   <h2> Design Tab </h2> 


				<?php
				/**
				 * A sample checkbox option
				 */

				?>

				          	<form method="post" action="options.php">
			<?php settings_fields( 'awesome_comingsoon_design' ); ?>
			<?php $options = get_option( 'awesome_comingsoon_design_options' ); ?>

			<table class="form-table">
				

				<?php
				/**
				 * A sample select input option
				 */
				?>
				<tr valign="top"><th scope="row"><?php _e( 'Background type', 'comingsoon' ); ?></th>
					<td>

						<select name="awesome_comingsoon_design_options[bg]" id="bg_type">
							<?php
								$selected = $options['selectinput'];
								$p = '';
								$r = '';

								foreach ( $select_options as $option ) {
									$label = $option['label'];
									if ( $selected == $option['value'] ) // Make default first in list
										$p = "\n\t<option style=\"padding-right: 10px;\" selected='selected' value='" . esc_attr( $option['value'] ) . "'>$label</option>";
									else
										$r .= "\n\t<option style=\"padding-right: 10px;\" value='" . esc_attr( $option['value'] ) . "'>$label</option>";
								}
								echo $p . $r;
							?>
						</select>
						<label class="description" for="awesome_comingsoon_options[bg]"><?php _e( ' ', 'comingsoon' ); ?></label>
					</td>
				</tr>

					<tr valign="top" id="customcolor"><th scope="row"><?php _e( 'Background Color', 'comingsoon' ); ?></th>
					<td >	
						 <input type="text"  name="awesome_comingsoon_design_options[customcolor]" value="<?php esc_attr_e( $options['customcolor'] ); ?>" class="color-picker" />
																							</td>
				</tr>
				<tr valign="top" id="bgimg" style="display:none;"><th scope="row"><?php _e( 'Background Image', 'comingsoon' ); ?></th>
					<td >	
										
   									 <input type="text" name="awesome_comingsoon_design_options[bgimg]" value="<?php esc_attr_e( $options['bgimg'] ); ?>" id="image_url" class="regular-text">
    									<input type="button" name="upload-btn" id="upload-btn" class="button-secondary" value="Upload Image">

														</td>
				</tr>

					<tr valign="top"><th scope="row"><?php _e( 'Social Media', 'comingsoon' ); ?></th>
					<td>
						<input id="awesome_comingsoon_design_options[social]" name="awesome_comingsoon_design_options[social]" type="checkbox" value="1" <?php checked( '1', $options['social'] ); ?> />
						<label class="description" for="awesome_comingsoon_design_options[social]"><?php _e( 'Include Social Media Links', 'comingsoon' ); ?></label>
					</td>
				</tr>
				<tr valign="top"><th scope="row"><?php _e( 'Facebook', 'comingsoon' ); ?></th>
					<td>
						<input id="awesome_comingsoon_design_options[fb]" class="regular-text" type="text" name="awesome_comingsoon_design_options[fb]" value="<?php esc_attr_e( $options['fb'] ); ?>" />
										</td>
				</tr>
				<tr valign="top"><th scope="row"><?php _e( 'Twitter', 'comingsoon' ); ?></th>
					<td>
						<input id="awesome_comingsoon_design_options[tw]" class="regular-text" type="text" name="awesome_comingsoon_design_options[tw]" value="<?php esc_attr_e( $options['tw'] ); ?>" />
										</td>
				</tr>
				<tr valign="top"><th scope="row"><?php _e( 'Instagram', 'comingsoon' ); ?></th>
					<td>
						<input id="awesome_comingsoon_design_options[in]" class="regular-text" type="text" name="awesome_comingsoon_design_options[in]" value="<?php esc_attr_e( $options['in'] ); ?>" />
										</td>
				</tr>
				<tr valign="top"><th scope="row"><?php _e( 'Linkedin', 'comingsoon' ); ?></th>
					<td>
						<input id="awesome_comingsoon_design_options[link]" class="regular-text" type="text" name="awesome_comingsoon_design_options[link]" value="<?php esc_attr_e( $options['link'] ); ?>" />
										</td>
				</tr>
				<tr valign="top"><th scope="row"><?php _e( 'Googleplus', 'comingsoon' ); ?></th>
					<td>
						<input id="awesome_comingsoon_design_options[gplus]" class="regular-text" type="text" name="awesome_comingsoon_design_options[gplus]" value="<?php esc_attr_e( $options['gplus'] ); ?>" />
										</td>
				</tr>


				
</table>

			<p class="submit">
				<input type="submit" name="awesome_comingsoon_save" class="button-primary" value="<?php _e( 'Save Options', 'comingsoon' ); ?>" />
			</p>
		</form>

		
                </div>
              
            </div>
        </div>

        <div id="sidebar" class="wrapper-cell">
    <div class="sidebar_box info_box">
        
    </div>

      
    
       
</div>    </div>


		
	</div>
	<?php
}

/**
 * Sanitize and validate input. Accepts an array, return a sanitized array.
 */


function acs_general_options_validate( $input ) {
	global $select_options, $radio_options;

	
	return $input;
}


function acs_content_options_validate( $input ) {
	global $select_options, $radio_options;

	// Say our textarea option must be safe text with the allowed tags for pos();
	$input['abouttext'] =$input['abouttext'] ;

	return $input;
}


function acs_design_options_validate( $input ) {
	global $select_options, $radio_options;

	//$input['sometextarea'] = wp_filter_post_kses( $input['sometextarea'] );

	return $input;
}

// adapted from http://planetozh.com/blog/2009/05/handling-plugins-options-in-wordpress-28-with-register_setting/