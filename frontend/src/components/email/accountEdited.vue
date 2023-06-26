<script lang='ts'> 
  export default {
    mounted() {
      const HTML = this.$el.innerHTML
      console.log(HTML)
      this.$emit('compiledTemplate', HTML)
    }
  }
</script>


  <style type="text/css">
.rollover:hover .rollover-first {
  max-height:0px!important;
  display:none!important;
  }
  .rollover:hover .rollover-second {
  max-height:none!important;
  display:block!important;
  }
  .rollover div {
  font-size:0;
  }
  u ~ div img + div > div {
  display:none;
  }
  #outlook a {
  padding:0;
  }
  span.MsoHyperlink,
span.MsoHyperlinkFollowed {
  color:inherit;
  mso-style-priority:99;
  }
  a.es-button {
  mso-style-priority:100!important;
  text-decoration:none!important;
  }
  a[x-apple-data-detectors] {
  color:inherit!important;
  text-decoration:none!important;
  font-size:inherit!important;
  font-family:inherit!important;
  font-weight:inherit!important;
  line-height:inherit!important;
  }
  .es-desk-hidden {
  display:none;
  float:left;
  overflow:hidden;
  width:0;
  max-height:0;
  line-height:0;
  mso-hide:all;
  }
  /*
.es-header-body a:hover {
  color:#000000!important;
  }
*/
  /*
.es-content-body a:hover {
  color:#391484!important;
  }
*/
  /*
.es-footer-body a:hover {
  color:#391484!important;
  }
*/
  /*
.es-infoblock a:hover {
  color:#cccccc!important;
  }
*/
  .es-button-border:hover a.es-button {
  color:#000000!important;
  }
  @media only screen and (min-width:214px) {
    .chek-hidden {
    position:absolute;
    visibility:hidden;
    height:0px;
    width:0px;
    max-height:0px;
    overflow:hidden;
    opacity:0;
    }
    lebel,
    label:hover {
    cursor:pointer!important;
    }
    .vn,
    .nv,
    [class*="w-level_"],
    [class*="d-level_"] {
    visibility:hidden;
    display:none;
    opacity:0;
    transform:scale(0);
    height:0;
    max-height:0px;
    line-height:0px;
    mso-hide:all;
    }
    #second-option:checked~.choose-zone .nv,
    #second-option:not(:checked)~.choose-zone .vn,
    #toLevel_white_0:checked~.choose-zone.goods .w-level_0,
    #toLevel_white_1:checked~.choose-zone.goods .w-level_1,
    #toLevel_white_2:checked~.choose-zone.goods .w-level_2,
    #toLevel_dark_0:checked~.choose-zone.goods .d-level_0,
    #toLevel_dark_1:checked~.choose-zone.goods .d-level_1,
    #toLevel_dark_2:checked~.choose-zone.goods .d-level_2,
    #toLevel_white_1:checked~#toLevel_dark_0:checked~.choose-zone.goods .w-level_3,
    #toLevel_white_2:checked~#toLevel_dark_0:checked~.choose-zone.goods .w-level_4,
    #toLevel_white_0:checked~#toLevel_dark_1:checked~.choose-zone.goods .w-level_5,
    #toLevel_white_0:checked~#toLevel_dark_2:checked~.choose-zone.goods .w-level_6,
    #toLevel_white_1:checked~#toLevel_dark_1:checked~.choose-zone.goods .w-level_7,
    #toLevel_white_1:checked~#toLevel_dark_2:checked~.choose-zone.goods .w-level_8,
    #toLevel_white_2:checked~#toLevel_dark_1:checked~.choose-zone.goods .w-level_9,
    #toLevel_white_2:checked~#toLevel_dark_2:checked~.choose-zone.goods .w-level_10 {
    visibility:visible!important;
    display:inline-block!important;
    opacity:1!important;
    transform:scale(1)!important;
    height:initial!important;
    max-height:initial!important;
    line-height:initial!important;
    }
    #second-option:checked~.choose-zone table.nv,
    #second-option:not(:checked)~.choose-zone table.vn,
    #toLevel_white_0:checked~.choose-zone.goods table.w-level_0,
    #toLevel_white_1:checked~.choose-zone.goods table.w-level_1,
    #toLevel_white_2:checked~.choose-zone.goods table.w-level_2,
    #toLevel_dark_0:checked~.choose-zone.goods table.d-level_0,
    #toLevel_dark_1:checked~.choose-zone.goods table.d-level_1,
    #toLevel_dark_2:checked~.choose-zone.goods table.d-level_2 {
    display:table!important;
    }
    #second-option:checked~.choose-zone table tr.nv,
    #second-option:not(:checked)~.choose-zone table tr.vn {
    display:table-row!important;
    }
    #second-option:checked+.choose-zone table tr td.nv,
    #second-option:not(:checked)+.choose-zone table tr td.vn {
    display:table-cell!important;
    }
  }


  @media only screen and (min-width:214px) {.chek-hidden { position:absolute; visibility:hidden; height:0px; width:0px; max-height:0px; overflow:hidden; opacity:0 } lebel, label:hover { cursor:pointer!important } .vn, .nv, [class*="w-level_"], [class*="d-level_"] { visibility:hidden; display:none; opacity:0; transform:scale(0); height:0; max-height:0px; line-height:0px; mso-hide:all } #second-option:checked ~ .choose-zone .nv, #second-option:not(:checked) ~ .choose-zone .vn, #toLevel_white_0:checked ~ .choose-zone.goods .w-level_0, #toLevel_white_1:checked ~ .choose-zone.goods .w-level_1, #toLevel_white_2:checked ~ .choose-zone.goods .w-level_2, #toLevel_dark_0:checked ~ .choose-zone.goods .d-level_0, #toLevel_dark_1:checked ~ .choose-zone.goods .d-level_1, #toLevel_dark_2:checked ~ .choose-zone.goods .d-level_2, #toLevel_white_1:checked ~ #toLevel_dark_0:checked ~ .choose-zone.goods .w-level_3, #toLevel_white_2:checked ~ #toLevel_dark_0:checked ~ .choose-zone.goods .w-level_4, #toLevel_white_0:checked ~ #toLevel_dark_1:checked ~ .choose-zone.goods .w-level_5, #toLevel_white_0:checked ~ #toLevel_dark_2:checked ~ .choose-zone.goods .w-level_6, #toLevel_white_1:checked ~ #toLevel_dark_1:checked ~ .choose-zone.goods .w-level_7, #toLevel_white_1:checked ~ #toLevel_dark_2:checked ~ .choose-zone.goods .w-level_8, #toLevel_white_2:checked ~ #toLevel_dark_1:checked ~ .choose-zone.goods .w-level_9, #toLevel_white_2:checked ~ #toLevel_dark_2:checked ~ .choose-zone.goods .w-level_10 { visibility:visible!important; display:inline-block!important; opacity:1!important; transform:scale(1)!important; height:initial!important; max-height:initial!important; line-height:initial!important } #second-option:checked ~ .choose-zone table.nv, #second-option:not(:checked) ~ .choose-zone table.vn, #toLevel_white_0:checked ~ .choose-zone.goods table.w-level_0, #toLevel_white_1:checked ~ .choose-zone.goods table.w-level_1, #toLevel_white_2:checked ~ .choose-zone.goods table.w-level_2, #toLevel_dark_0:checked ~ .choose-zone.goods table.d-level_0, #toLevel_dark_1:checked ~ .choose-zone.goods table.d-level_1, #toLevel_dark_2:checked ~ .choose-zone.goods table.d-level_2 { display:table!important } #second-option:checked ~ .choose-zone table tr.nv, #second-option:not(:checked) ~ .choose-zone table tr.vn { display:table-row!important } #second-option:checked + .choose-zone table tr td.nv, #second-option:not(:checked) + .choose-zone table tr td.vn { display:table-cell!important } }
@media only screen and (max-width:600px) {.es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } *[class="gmail-fix"] { display:none!important } p, a { line-height:150%!important } h1, h1 a { line-height:120%!important } h2, h2 a { line-height:120%!important } h3, h3 a { line-height:120%!important } h4, h4 a { line-height:120%!important } h5, h5 a { line-height:120%!important } h6, h6 a { line-height:120%!important } .es-header-body p { } .es-content-body p { } .es-footer-body p { } .es-infoblock p { } h1 { font-size:28px!important; text-align:left } h2 { font-size:24px!important; text-align:left } h3 { font-size:20px!important; text-align:left } h4 { font-size:24px!important; text-align:left } h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:28px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px!important } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px!important } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock a { font-size:12px!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right!important } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img, .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline!important } .es-m-txt-r .rollover div, .es-m-txt-c .rollover div, .es-m-txt-l .rollover div { line-height:0!important; font-size:0!important } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:14px!important } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block!important } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .adapt-img:not([src*="default-img"]) { width:100%!important; height:auto!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } .es-social td { padding-bottom:10px } .m-c-p16r { padding-right:8vw } .h-auto, table.h-auto { height:auto!important } a.es-button, button.es-button { display:inline-block!important } .es-button-border { display:inline-block!important } }
</style>

<template>
 <body style="width:100%;height:100%;padding:0;Margin:0">
  <div class="es-wrapper-color" style="background-color:#FFFFFF"><!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#ffffff" origin="0.5, 0" position="0.5, 0"></v:fill>
			</v:background>
		<![endif]-->
   <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:no-repeat;background-position:center top;background-color:#FFFFFF">
     <tr>
      <td valign="top" style="padding:0;Margin:0">
       <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
         <tr>
          <td class="es-m-p15r es-m-p15l" align="center" style="padding:0;Margin:0">
           <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:640px">
             <tr>
              <td align="left" style="padding:0;Margin:0;padding-top:30px;padding-right:40px;padding-left:40px">
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr class="es-mobile-hidden">
                      <td align="center" height="44" style="padding:0;Margin:0"></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr>
              <td class="es-m-p20" align="left" bgcolor="#efefef" style="padding:40px;Margin:0;background-color:#efefef;border-radius:20px 20px 0px 0px;background-position:left top">
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://viewstripo.email/" style="mso-line-height-rule:exactly;text-decoration:underline;color:#391484;font-size:18px"><img src="https://sfxhbe.stripocdn.email/content/guids/8149ef34-e14d-42cc-9eb2-97b94e7b0668/images/aatbio_com_image_export_jun_21_2023.png" alt="" style="display:block;font-size:18px;border:0;outline:none;text-decoration:none" height="72"></a></td>
                     </tr>
                     <tr>
                      <td align="center" height="20" style="padding:0;Margin:0"></td>
                     </tr>
                   </table></td>
                 </tr>
                 <tr>
                  <td align="left" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-width:0;background:url('https://demo.stripocdn.email/content/guids/videoImgGuid/images/20220729_16_19_09mouse_highlight_overlay.png') no-repeat #ffffff;border-radius:20px" background="https://sfxhbe.stripocdn.email/content/guids/videoImgGuid/images/20220729_16_19_09mouse_highlight_overlay.png" role="presentation">
                     <tr>
                      <td align="left" class="es-m-txt-l es-m-p20r es-m-p20l" style="padding:0;Margin:0;padding-right:40px;padding-left:40px;padding-top:20px"><h1 style="Margin:0;font-family:'Exo 2', sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:36px;font-style:normal;font-weight:bold;line-height:43px;color:#000000;text-transform:uppercase">Dear {User},</h1></td>
                     </tr>
                     <tr>
                      <td align="left" class="es-m-txt-l es-m-p20r es-m-p20l" style="Margin:0;padding-right:40px;padding-left:40px;padding-top:15px;padding-bottom:20px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:'Exo 2', sans-serif;line-height:27px;letter-spacing:0;color:#666666;font-size:18px">We noticed that your account was edited.<br><br>Hopefully this was just you, but in case it wasn't we suggest changing your password as soon as possible.</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:'Exo 2', sans-serif;line-height:27px;letter-spacing:0;color:#666666;font-size:18px"><br></p><p style="Margin:0;mso-line-height-rule:exactly;font-family:'Exo 2', sans-serif;line-height:27px;letter-spacing:0;color:#666666;font-size:18px">We hope that nothing is wrong...<br></p><p style="Margin:0;mso-line-height-rule:exactly;font-family:'Exo 2', sans-serif;line-height:27px;letter-spacing:0;color:#666666;font-size:18px">ExamTimer Team</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:'Exo 2', sans-serif;line-height:27px;letter-spacing:0;color:#666666;font-size:18px"><br></p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr>
              <td align="left" bgcolor="#efefef" style="padding:20px;Margin:0;background-color:#efefef;border-radius:0px 0px 20px 20px;background-size:contain">
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;width:600px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;font-size:0px"><a target="_blank" href="https://viewstripo.email/" style="mso-line-height-rule:exactly;text-decoration:underline;color:#391484;font-size:18px"><img src="https://sfxhbe.stripocdn.email/content/guids/8149ef34-e14d-42cc-9eb2-97b94e7b0668/images/aatbio_com_image_export_jun_21_2023.png" alt="" style="display:block;font-size:18px;border:0;outline:none;text-decoration:none" width="180"></a></td>
                     </tr>
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-top:15px;font-size:0">
                       <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td align="center" valign="top" style="padding:0;Margin:0;padding-right:15px"><img title="Facebook" src="https://sfxhbe.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32" height="32" style="display:block;font-size:18px;border:0;outline:none;text-decoration:none"></td>
                          <td align="center" valign="top" style="padding:0;Margin:0;padding-right:15px"><img title="Twitter" src="https://sfxhbe.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png" alt="Tw" width="32" height="32" style="display:block;font-size:18px;border:0;outline:none;text-decoration:none"></td>
                          <td align="center" valign="top" style="padding:0;Margin:0;padding-right:15px"><img title="Instagram" src="https://sfxhbe.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32" height="32" style="display:block;font-size:18px;border:0;outline:none;text-decoration:none"></td>
                          <td align="center" valign="top" style="padding:0;Margin:0"><img title="Youtube" src="https://sfxhbe.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32" height="32" style="display:block;font-size:18px;border:0;outline:none;text-decoration:none"></td>
                         </tr>
                       </table></td>
                     </tr>
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-top:15px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:'Exo 2', sans-serif;line-height:27px;letter-spacing:0;color:#666666;font-size:18px">© 69BC - {{ new Date().getFullYear() }} Examtimer. All Rights Reserved</p></td>
                     </tr>
                     <!-- <tr>
                      <td align="center" style="padding:0;Margin:0;padding-top:10px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:'Exo 2', sans-serif;line-height:27px;letter-spacing:0;color:#666666;font-size:18px"><a target="_blank" href="" style="mso-line-height-rule:exactly;text-decoration:underline;color:#391484;font-size:18px">Unsubscribe</a></p></td>
                     </tr> -->
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:640px">
             <tr>
              <td align="left" style="padding:40px;Margin:0">
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;display:none"></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table></td>
     </tr>
   </table>
  </div>
 </body>
</template>