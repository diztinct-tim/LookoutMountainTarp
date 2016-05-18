import PageManager from '../page-manager';
import $ from 'jquery';

export default class Home extends PageManager {

	loaded(next) {

		$(".home-featured-categories h4").click(function(){
			$(this).toggleClass("open");
			$(this).next("ul").slideToggle();
		});

	}





 }