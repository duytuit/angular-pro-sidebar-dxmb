import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as jquery from 'jquery';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'app';
  constructor( private mScrollbarService: MalihuScrollbarService,){
    jquery(function ($) {
      // Dropdown menu
      $(".sidebar-dropdown > a").click(function () {
          $(".sidebar-submenu").slideUp(200);
          if ($(this).parent().hasClass("active")) {
              $(".sidebar-dropdown").removeClass("active");
              $(this).parent().removeClass("active");
          } else {
              $(".sidebar-dropdown").removeClass("active");
              $(this).next(".sidebar-submenu").slideDown(200);
              $(this).parent().addClass("active");
          }
  
      });
  
      //toggle sidebar
      $("#toggle-sidebar").click(function () {
          $(".page-wrapper").toggleClass("toggled");
      });
      //Pin sidebar
      $("#pin-sidebar").click(function () {
          if ($(".page-wrapper").hasClass("pinned")) {
              // unpin sidebar when hovered
              $(".page-wrapper").removeClass("pinned");
              $("#sidebar").unbind( "hover");
          } else {
              $(".page-wrapper").addClass("pinned");
              $("#sidebar").hover(
                  function () {
                      console.log("mouseenter");
                      $(".page-wrapper").addClass("sidebar-hovered");
                  },
                  function () {
                      console.log("mouseout");
                      $(".page-wrapper").removeClass("sidebar-hovered");
                  }
              )
  
          }
      });
  
  
      //toggle sidebar overlay
      $("#overlay").click(function () {
          $(".page-wrapper").toggleClass("toggled");
      });
  
      //switch between themes 
      var themes = "default-theme legacy-theme chiller-theme ice-theme cool-theme light-theme";
      $('[data-theme]').click(function () {
          $('[data-theme]').removeClass("selected");
          $(this).addClass("selected");
          $('.page-wrapper').removeClass(themes);
          $('.page-wrapper').addClass($(this).attr('data-theme'));
      });
  
      // switch between background images
      var bgs = "bg1 bg2 bg3 bg4";
      $('[data-bg]').click(function () {
          $('[data-bg]').removeClass("selected");
          $(this).addClass("selected");
          $('.page-wrapper').removeClass(bgs);
          $('.page-wrapper').addClass($(this).attr('data-bg'));
      });
  
      // toggle background image
      $("#toggle-bg").change(function (e) {
          e.preventDefault();
          $('.page-wrapper').toggleClass("sidebar-bg");
      });
  
      // toggle border radius
      $("#toggle-border-radius").change(function (e) {
          e.preventDefault();
          $('.page-wrapper').toggleClass("border-radius-on");
      });
  });
     //custom scroll bar is only used on desktop
  }
  ngAfterViewInit() {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        this.mScrollbarService.initScrollbar(".sidebar-content", {  axis: 'y',
        autoHideScrollbar: true,
        scrollInertia: 300})
        $(".sidebar-content").addClass("desktop");
    
    }
  }

  ngOnDestroy() {
    this.mScrollbarService.destroy('.sidebar-content');
  }
}
