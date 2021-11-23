class Action{
    constructor(parameter) {
        this._title_item = parameter.title_item;
        this._item = parameter.item;
        this._index = 0;
        this._add_event();
    }
    _add_event(){
        let that = this;
        this._title_item.click(function(){
            let this_index = $(this).attr('data-index');
            if(that._index != this_index){
                that._item.removeClass('self');
                that._item.eq(this_index).addClass('self');
                that._index = this_index;
            }
        });
    }
}