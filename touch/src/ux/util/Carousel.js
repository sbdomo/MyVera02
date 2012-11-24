Ext.define('Ext.ux.util.Carousel', {
    extend : 'Ext.carousel.Carousel',
    alias  : 'ux-carousel',

    toggleSwipe: function(allow) {
        this.element[allow ? 'on' : 'un']({
            dragstart : 'onDragStart',
            drag      : 'onDrag',
            dragend   : 'onDragEnd',
            scope     : this
        });
    }
});
