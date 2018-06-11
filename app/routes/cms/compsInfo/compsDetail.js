module.exports = {
  card: require('./cardDetail'),
  div: require('./CLdivDetail'),
  label: require('./labelDetail'),
  pie: require('./pieChartDetail'),
  column: require('./pieChartDetail'),
  line: require('./pieChartDetail'),
  annulus: require('./pieChartDetail'),
  stack: require('./pieChartDetail'),
  bar: require('./pieChartDetail'),
  coline: require('./pieChartDetail'),
  double:require('./pieChartDetail'),
  probar:require('./probarDetail'),
  table1:require('./table1Detail'),
  select:require('./selectDetail'),
  button:require('./buttonDetail'),
  dashboard:require('./dashboardDetail'),
  temp:require('./dashboardDetail'),
  colorselect:function(id,color){
  	 $.minicolors = {
        defaults: {
        animationSpeed: 50,
        animationEasing: 'swing',
        change: null,
        changeDelay: 0,
        control: 'hue',
        defaultValue: color,
        hide: null,
        hideSpeed: 100,
        inline: false,
        letterCase: 'lowercase',
        opacity: false,
        position: 'bottom left',
        show: null,
        showSpeed: 100,
        theme: 'default'
       }
     
    };
     $('#'+id).minicolors({
           change: function(hex, opacity) {
             
          }
      });

  },
 
}
