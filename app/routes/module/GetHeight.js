export function GetHeight(){
     setTimeout(function(){
         let heightArr1=[$('#CLpageheight').height()];//收集所有的top值
         let maxtop1;//定义最大值
        $('#CLpageheight div').each(function(){
            if($(this).data('box')=='CLbox'){
              var topy = Number($(this).css('top').replace("px",""));
              var heighty = Number($(this).css('height').replace("px",""));
                heightArr1.push(topy+heighty)
            }
        })
         maxtop1=Math.max.apply( Math, heightArr1 );//获取数组中的最大值
         $('#CLpageheight').height(maxtop1+40+'px')
         console.log('数组',heightArr1)
         console.log('最大值',maxtop1)

      },1000)
}