把控制台弹窗出来使用

1.响应式原理

大家也许会好奇,为什么没办法监听对象新增属性?

Vue3最大的变化之一就是底层响应式原理的实现方式变了,以前用的是Object.defineProperty,在实例初始化时遍历data所有的property，并使用Object.defineProperty把这些property全部转为getter/setter存取器来监听属性的查和改.我给大家举一个例子.

为什么没办法通过下标更新数组?数组它也是对象啊?数字下标其实就是也就是对象键,不存在的属性无法响应式更新可以理解,那已经存在的属性为什么没办法通过下标去修改它,而是只能依靠封装的7种方法.

尤玉溪说的很清楚,性能问题哈.

我带大家来看下这些代码哈,这个data对象类似我们写Vue文件里面的data选项,Vue呢就是Vue了,

然后在组件初始化的时候,Vue内部就会把data里面的这些属性转换成getter和setter.其实就是去监听这些属性的查跟改,然后这个响应式处理的阶段只发生在生命周期的BeforeCreat和Created之间.



```js
let data = {
      name: '张三',
      age: 20
    }
let vue={}
Object.defineProperty(vue, 'name', {
      configurable: true,
      get() {
        console.log('读取vue的name属性 执行响应式处理');
        return data.name
      },
      set(value) {
        console.log('修改vue的name属性 执行响应式处理');
        data.name = value
      }
    })
```

这样的话我们就可以看见一个简易版的响应式数据,这个执行完之后,每当你获取和修改这个属性的值的时候,都会去执行你在内部定义的方法,Vue2就是通过这个Api来实现收集依赖和当依赖改变时触发响应式更新.当然这个有一个缺点,它只能监听到属性的查跟改,没办法监听到属性的增和删.如果你直接去添加属性或者删除属性,界面不会更新.  在Vue2的时候是这么操作的,关于对象和数据的响应式更新,第一种是你直接覆盖整个对象,第二是使用它内部封装的7个方法,还有就是使用Vue.set Vue.delete这两个Api,但总归有些麻烦,有时候你就会忘记了.会造成一些你莫名其妙产生的Bug.

党在十三大报告指出:“我们现阶段所面临的主要矛盾，是人民日益增长的物质文化需要同落后的社会生产之间的矛盾”,这个Object.defineProperty有点局限的Api明显就和我们这些人民产生了矛盾.因此,Vue3的时候,响应式原理就改变成用Proxy 这个ES6新出的api来实现.我们来看下代码.

Proxy这个Api的中文意思是代理,MDN的定义时是

**Proxy** 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。

创造这个代理有什么用呢,主要是这时候我们就可以监听到别人对这个对象的操作,然后实行响应式处理.

```
const p = new Proxy(target, handler)
```

```js
let data = {
    name: '张三',
    age: 20
  }

let vue = new Proxy(data, {
  get(target, propName) {
    console.log(`读取vue的${propName}属性`);
    return target[propName]
  },
  set(target, propName, value) {
    console.log(`修改vue的${propName}属性`);
    target[propName] = value
  },
  deleteProperty(target, propName) {
    console.log(`删除vue的${propName}属性`);
    return target[propName]
}
})
```

![image-20220102232254651](C:\Users\Yukon\Desktop\Vue3资料库\202201022323818.png)

2.组合式API

刚刚讲的是底层原理的改变,现在讲下我们实际上会用到的改变,Vue3解决的痛点.相信大家肯定都接触过写的很长的Vue文件,当我们在做需求迭代的时候,有时候花最多时间,是搞明白别人写的这一些代码逻辑是什么,这些东西往往非常分散,同一个逻辑里面的代码,有的在data,有的在methods,有的是computed,有的在生命周期钩子里面,用官网的一张图来给大家看下,相信大家应该都会有既视感.我们在维护某一个逻辑的时候,需要不断跳来跳去,这给我们的后期维护和更新迭代带来了很大的麻烦.这个时候组合式Api就出现了.



组合式api顾名思义就是把原先分散在各处的逻辑组合起来在一个地方书写.vue3提供了一个选项叫做setup();

setup(props,contexs)  setup就是用来替代data computed methods 和生命周期这些选项的,setup就是自己定义的响应式数据,为什么要第一个参数是props,因为props是父组件传过来的,并且我们如果要使用都是在computed里面进行了一步转换.

`setup()` 方法是在 `beforeCreate()` 生命周期函数之前执行的函数；

![img](C:\Users\Yukon\Desktop\Vue3.assets\3f6372e90f1f41e3b95b9a69da505470tplv-k3u1fbpfcp-watermark.awebp)

​	

在setup里面我们可以来替代之前提到的选项.

比如data 

![image-20220103043947677](C:\Users\Yukon\Desktop\Vue3.assets\image-20220103043947677.png)