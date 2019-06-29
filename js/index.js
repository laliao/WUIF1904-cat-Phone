$(function() {

    //上拉加载
    var myScroll = new IScroll('#bigboxs', { probeType: 3 })

    //使用iscroll插件的scroll事件
    //通过scroll事件获取到相关滚动信息，根据滚动信息可以确定什么时候进行刷新，重新获取数据

    //定义开关，必须等到需要获取数据的时候在进行数据的获取
    //将scroll事件添加给滚动部分，myScroll
    //保存已经滚动过的距离与最大距离的差值,num
    //当num<0时，表示可以进行页面的刷新，当-50>num>-100给用户提示刷新信息
    //当页面滚动结束之后进行数据的跟新





    //添加滚动事件  
    //滚顶事件发生的时候，对象上有属性y保存已经滚动过的距离，maxScrollY保存最大能够滚动的距离，根据这两个数值的差值可以进行判断是否进行数据的请求
    //在差值>-100,<-50的时候提示用户释放信息
    //在释放之后，运动结束的时候去获取数据，因为运动结束的事件很多，所以会造成大量的问题，需要开关，当开关为真的时候再进行数据的获取，否则不能。在差值>-100,<-50的时候进行数据的刷新，将开关改为真。数据请求结束以后将开关改为假


    let flag = false
    myScroll.on("scroll", function() {
        // console.log(this)
        let scrollh = this.y //滚动过的像素
        let sch = this.maxScrollY //页面的最高像素值，从top开始，是负数
        let num = scrollh - sch
        if (num < 0 && num > -50) {
            console.log("上拉加载")

        }
        if (num > -100 && num < -50) {
            console.log("信息加载")
            flag = true
        }
    })
    myScroll.on("scrollEnd", function() {
        if (flag) {
            console.log("获取数据")
            huo()
            flag = false
            myScroll.refresh();
        }
    })



    //         // let imglist = document.getElementsByTagName("img")
    //         // console.log(imglist)
    //         // $.each(imglist, (i, v) => {
    //         //     v.classList.add("lazy")
    //         // })
    //         // $("img.lazy").lazyload({
    //         //     effect: "fadeIn",
    //         //     container: ".bigboxin",
    //         //     threshold: 300,
    //         // })




    var mySwiper = new Swiper(".swiper-container", { //new
        autoplay: { //自动轮播
            autoplay: true,
            disableOnInteraction: false, //操作之后自动轮播
            delay: 1500, //切换时间
        },
        loop: true, //路径，无缝轮播
        pagination: {
            el: '.swiper-pagination',
        },
    })







    //ajax获取数据  
    //1、实例化  new  
    //2、用open方法设置请求 
    //4、onreadystatechange,判断请求是否发送成功  ，确定客户端与服务器连接正常并且响应的数据也正常才能获取数据
    //设置接收数据的格式（responseType），一般为json?格式，如果没有这个设置，需要在接收到的数据中使用JSON.parse()方法将返回来的数据字符串转为json格式的数据
    //3、使用send方法发送请求
    function huo() {
        let url = "https://www.easy-mock.com/mock/5cb813c897b3057000200322/td/goods"
        let cbody = document.querySelector(".caini-cont")
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // console.log(xhr)
                let data = xhr.response.data.data //是一个数组
                    //将数据分类放入到页面中，会使用字符串的拼接，我们使用模板字符串方便数据的绑定
                    //将data循环遍历把所有的数据拿出来进行渲染
                let str = ""
                data.forEach((v) => {
                        // console.log(v)
                        if (v.type == 0) {
                            str += `
                        <div class="shopCard">
                        <a href="">
                            <div class="imgBox">
                                <img src="${v.thumb}" alt="">
                            </div>
                            <div class="inforBox">
                                <p class="infor">${v.name}</p>
                                <span class="biaoqian">${v.discount}</span>
                            </div>
                            <div class="priceBox">
                                <span class="price">${v.price}</span>
                                <a href="" class="xiangsi">看相似</a>
                            </div>
                            <div class="b-biaoqian">
                                <img src="./img/FR.png" alt="">
                                <span>${v.special}</span>
                            </div>
                        </a>
                        </div>
                        `
                        } else if (v.type == 1) {
                            str += `
                        <a href="" class="adv">
                        <img src="${v.thumb}" alt="">
                        </a>
                        `
                        }

                    })
                    // console.log(str)
                cbody.innerHTML += str //获取数据可重复
                str = "" //确保每次收到的数据都是新的，加载完后给其清空

            }
        }
        xhr.responseType = "json"
        xhr.open("get", url, true)
        xhr.send(null)
    }
    huo()

})