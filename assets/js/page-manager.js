export default class PageManager {
    before(next) {
        next();

        if($("div.main.full").hasClass("home-page")){
            $("div.body").addClass("home");
        }

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
