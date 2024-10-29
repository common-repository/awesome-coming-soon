<?php 



function acs_front_view(){

require_once ('acs-plugin-options.php' );
$content = get_option('awesome_comingsoon_options');
$settings=get_option('awesome_comingsoon_design_options');
$general=get_option('awesome_comingsoon_options_settings');

	?>


<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"><![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"><![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"><![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="en"><!--<![endif]-->
<head>
<meta charset="UTF-8">
<title> <?php echo $content['title'];  ?></title>

 <link rel="stylesheet" href="<?php echo plugins_url('inc/css/style-frontend.css',dirname(__FILE__)); ?>">
 <link rel="stylesheet" href="<?php echo plugins_url('inc/css/fonts/fontawesome/font-awesome.css',dirname(__FILE__)); ?>">
<?php

$background = get_option('awesome_comingsoon_design_options');
if($background['bg']=='color'){


	echo '<style>';
	echo 'html{';
	echo 'background:' . $background['customcolor']; //xss okay
	echo '}';
	echo '</style>';
}
if($background['bg']=='image'){
	
	

echo '<style>';
	echo 'html{';
	echo 'background:url(' . $background['bgimg'] .')   no-repeat;';
	echo 'height:100%;';
	echo '}';
	echo '</style>';
}
 


?>


</head>
<body>

<div id="outercont" class="clearfix">
    <div id="innercont" class="clearfix">
	
		<div id="content" class="bodycontainer clearfix">
			
            <h1>  <?php echo $content['heading'];   ?> </h1>

            	
            
            <div  class="clearfix"> </div>

            <!--
			<div id="countdowncont" class="clearfix">
				<ul id="countscript">
					<li>
						<span class="days">00</span>
						<p>Days</p>
					</li>
					<li>
						<span class="hours">00</span>
						<p>Hours</p>
					</li>
					<li class="clearbox">
						<span class="minutes">00</span>
						<p>Minutes</p>
					</li>
					<li>
						<span class="seconds">00</span>
						<p>Seconds</p>
					</li>
				</ul>
			</div> -->

 				<?php echo $content['abouttext'];  ?> 


 				<?php if ( ! empty( $settings['social'] ) ) {
    ?> 
    <div id="socialmedia" class="clearfix">
    	 <div  class="clearfix"> </div>
				<ul>
					<li><a title="" href="<?php _e( $settings['fb'])?>" rel="external"><span class="fa fa-facebook"></span></a></li>
					<li><a title="" href="<?php _e( $settings['tw'])?>" rel="external"><span class="fa fa-twitter"></span></a></li>
					<li><a title="" href="<?php _e( $settings['gplus'])?>" rel="external"><span class="fa fa-google-plus"></span></a></li>
					<li><a title="" href="<?php _e( $settings['link'])?>" rel="external"><span class="fa fa-linkedin"></span></a></li>
					<li><a title="" href="<?php _e( $settings['in'])?>" rel="external"><span class="fa fa-instagram"></span></a></li>
				</ul>
			
    <?php
} else {
    // Not checked
}
?>
			
			
		</div>
		


 				<?php if ( ! empty( $general['credits'] ) ) {
    ?> 
		<div id="copyright" class="bodycontainer">

			<p>Made with <i class="fa fa-heart"></i> &nbsp;By  <a title="PhotonTechnologies" href="http://www.photontechs.com" rel="external">Photon Technologies</a></p>
			
		</div>
<?php }

?>
	</div>
</div>

<?php wp_footer();?>
	
	  <script src="<?php echo plugins_url('inc/js/scripts.js',dirname(__FILE__)); ?>"></script>
  	

   
</body>
</html>


<?php }
?>