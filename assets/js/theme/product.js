/*
 Import all product specific js
 */
import $ from 'jquery';
import PageManager from '../page-manager';
import Review from './product/reviews';
import collapsibleFactory from './common/collapsible';
import ProductDetails from './common/product-details';
import videoGallery from './product/video-gallery';
import { classifyForm } from './common/form-utils';

$(function(){


        function checkIfSlider(){
            var imgs = $(".productView-thumbnails li").length;
            if( imgs > 3 ){
                $(".productView-thumbnails").slick({
                  dots: false,
                    responsive: [{
                        breakpoint: 1024,
                          settings: {
                            slidesToShow: 6,
                            slidesToScroll: 3,
                          }
                        }, {

                          breakpoint: 768,
                          settings: {
                            slidesToShow: 5,
                            slidesToScroll: 3,
                          }
                        }, {

                          breakpoint: 600,
                          settings: {
                            slidesToShow: 4,
                            slidesToScroll: 2,
                          }
                        }, {

                          breakpoint: 480,
                          settings: {
                            slidesToShow: 3,
                            slidesToScroll: 2,
                        }
                    }]
                });
            }
        }
        checkIfSlider();


})

export default class Product extends PageManager {
    constructor() {
        super();
        this.url = location.href;
        this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    }

    before(next) {
        // Listen for foundation modal close events to sanitize URL after review.
        $(document).on('close.fndtn.reveal', () => {
            if (this.url.indexOf('#writeReview') !== -1) {
                History.replaceState('', document.title, window.location.pathname);
            }
        });

        next();

        $("body").addClass("product-page");


    }

    loaded(next) {
        let validator;

        // Init collapsible
        collapsibleFactory();

        this.productDetails = new ProductDetails($('.productView'), this.context);

        videoGallery();

        const $reviewForm = classifyForm('.writeReview-form');
        const review = new Review($reviewForm);

        $('body').on('click', '[data-reveal-id="modal-review-form"]', () => {
            validator = review.registerValidation();
        });

        $reviewForm.on('submit', () => {
            if (validator) {
                validator.performCheck();
                return validator.areAll('valid');
            }

            return false;
        });

        next();
    }

    after(next) {
        this.productReviewHandler();

        next();
    }

    productReviewHandler() {
        if (this.url.indexOf('#writeReview') !== -1) {
            this.$reviewLink.click();
        }
    }
}
