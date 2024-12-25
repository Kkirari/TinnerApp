import { Component, OnInit } from '@angular/core';
import { gsap, Power1, Power3 } from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  constructor() {
    // Register the MorphSVG plugin
    gsap.registerPlugin(MorphSVGPlugin);
  }

  ngOnInit(): void {
    this.initializeAnimations();
  }

  private initializeAnimations(): void {
    // H1 animation
    gsap.to('h1', {
      duration: 1,
      alpha: 1,
      y: 20,
      yoyo: true,
      ease: "power3.inOut"
    });

    // Water paths animation
    gsap.to('#water path', {
      duration: 2,
      x: "+=10",
      y: "+=5",
      repeat: -1,
      yoyo: true,
      ease: "power3.inOut",
      stagger: 1
    });

    // Bottle animation
    gsap.to('#bottle', {
      duration: 3,
      x: "+=30",
      y: "+=5",
      rotation: "+=7",
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 2
    });

    // Numbers animation
    gsap.to('#numbers path', {
      duration: 4,
      rotation: -30,
      skewY: '10deg',
      x: "+=10",
      y: "+=5",
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: {
        amount: -5
      }
    });

    // Bubbles animation
    gsap.to('#bubbles circle', {
      duration: 4,
      x: "+=1",
      y: "+=80",
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: {
        amount: -5
      }
    });

    // Bubbles2 animation
    gsap.to('#bubbles2 circle', {
      duration: 3,
      x: "+=10",
      y: "+=40",
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: {
        amount: -5
      }
    });

    // Tent animations
    gsap.to('#tent5', {
      duration: 4,
      morphSVG: "M450.156,820.511l0.395,0.462c34.244,40.2,30.831,65.406,18.13,86.909 c-0.001,0.002-0.003,0.005-0.004,0.007h84.433c0.009-0.056,0.019-0.106,0.028-0.162c1.949-11.366,3.12-25.264,1.164-36.695 c-2.091-14.146-8.913-35.893-26.464-64.532c-14.815-22.431-21.191-29.198-66.652-72.601c-61-57.914-54.765-51.116-61.914-61.358 c-16.548-25.645-15.705-60.353,4.333-87.092c15.819-21.144,34.798-28.843,56.219-33.275c8.384-1.736,14.551-9.302,14.253-18.149 c-0.333-9.89-8.622-17.638-18.513-17.304c-33.573,1.164-62.735,12.935-86.354,36.629c-23.05,23.077-36.875,54.064-36.968,91.268 c0.14,29.981,10.858,60.685,34.242,86.519C392.059,759.365,426.772,794.55,450.156,820.511z",
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Add similar blocks for tent1, tent2, tent3, and tent4...
    // (I've omitted them for brevity but they follow the same pattern)
  }
}