export default class PageManager {
    before(next) {
        next();

        if($("div.main.full").hasClass("home-page")){
            $("div.body").addClass("home");
        }

        function addPageClass(){
            var catName = $('.page-heading').text();
            var catName = catName.replace(/ /g, '');         
            var catName = catName.replace(/'/g, '');
            var catName = catName.replace(/&/g, '');
            var catName = $.trim(catName);
            if( catName == "404Error-Pagenotfound" ){
                $('body').addClass('page-not-found');
            } else {
                $('body').addClass(''+catName+'');
            }
        }
        addPageClass();

        // add classes to cat page
        function addCategoryPageClass(){
            if( $(".page").hasClass('category-page') ){
                $("body").addClass("CategoryPage");
            }
        }
        addCategoryPageClass();

        // add class to searchpage
        function addSearchPageClass(){
            if( $(".page").hasClass('search-page') ){
                $("body").addClass("SearchPage");
            }
        }
        addSearchPageClass();

    }

    loaded(next) {
        next();
    }

    after(next) {
        next();
    }

    type() {
        return this.constructor.name;
    }
}
