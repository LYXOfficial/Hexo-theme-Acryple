---
title: OI-C++中常用的一些STL函数和模板
abbrlink: 4ebac27c
date: 2022-11-11 08:26:10
tags: 
- OI
categories:
- OI
cover: https://bu.dusays.com/2022/11/11/636db721a99c1.webp
---

（仅作个人备忘）

其实很早就想着更了，但是因为前段时间封校导致没法更新，现在趁着上网课就更新吧。

{% note info simple %}
PS:LATEX终于弄好了！！！
{% endnote %}

# 基本结构

```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){
    //代码
    return 0;
}
```

# 排序

## STLsort

最香的当然是STL sort，采用快排堆排插排混合，时间复杂度$O(n log_{n} )$到$O(n^2)$：
```cpp
sort(arr,arr+n,cmp);
//其中cmp可以不加，默认从小到大
```

至于cmp的写法,只需要写两项的比较规则，比如从小到大写成:
```cpp
int cmp(int a,int b){
    return a<b;
}
```

从大到小：
```cpp
int cmp(int a,int b){
    return a>b;
}
```

利用cmp就能实现sort的结构体排序和题目的特殊要求，举个例子：
{% hideToggle 例子 %}
### FZQOJ#84. 近似排序

读入正整数x和y，将这两个数之间（包括这两个数本身）的所有数按下述特别规则排序后输出。

该特别规则是：按两数倒过来的值进行比较决定其大小，如30倒过来为3,29倒过来为92，则29大于30

**【输入】**
一行两个整数x和y，用一个空格隔开，$1\le x\le y\le 1000000000$,$y-x\le 100$

**【输出】**
包括$y-x+1$行，每行一个正整数，按两数倒过来的值进行比较决定其大小，然后由小到大输出

**【样例】**
样例输入1
```
22 39
```
样例输出1
```
30
31
22
32
23
33
24
34
25
35
26
36
27
37
28
38
29
39
```
使用sort：
```cpp
#include <bits/stdc++.h>
using namespace std;
int cmp(int a,int b){
	int a2=0;
	while(a!=0)
	{ 
	    a2*=10;
	    a2+=a%10;
	    a/=10;
	}
	int b2=0;
	while(b!=0)
	{ 
	    b2*=10;
	    b2+=b%10;
	    b/=10;
	}
	return a2<b2;
}
int main(){
	int x,y,l[114];
	cin>>x>>y;
	int n=y-x+1;
	for(int i=1;i<=n;i++){
		l[i]=i+x-1;
	}
	sort(l+1,l+n+1,cmp);
	for(int i=1;i<=n;i++){
		cout<<l[i]<<endl;
	}
	return 0;
}
```
冒泡：
```cpp
#include <bits/stdc++.h>
using namespace std;
int cmp(int a,int b){
	int a2=0;
	while(a!=0)
	{ 
	    a2*=10;
	    a2+=a%10;
	    a/=10;
	}
	int b2=0;
	while(b!=0)
	{ 
	    b2*=10;
	    b2+=b%10;
	    b/=10;
	}
	return a2<b2;
}
int main(){
	int x,y,l[114];
	cin>>x>>y;
	int n=y-x+1;
	for(int i=1;i<=n;i++){
		l[i]=i+x-1;
	}
	for(int i=2;i<=n;i++){
		for(int j=2;j<=n;j++){
			if(cmp(l[j],l[j-1])){
				int tmp=l[j];
				l[j]=l[j-1];
				l[j-1]=tmp;
			}
		}
	}
	for(int i=1;i<=n;i++){
		cout<<l[i]<<endl;
	}
	return 0;
}
```

都是AC代码，但是显然前者速度更快且更简单，可以节省你在比赛时的时间以及突然忘记模板的风险。
{% endhideToggle %}


## 选择排序

时间复杂度：固定时间复杂度$O(n^2)$，不稳定

我使用的是打擂台一个一个找放到第二个数组中，这样子可以简单一点，当然空间复杂度双倍快乐
从大到小：
```cpp
int arr1[114514],arr2[191981],n,max,maxi,k=1;
//假设arr1已经有了数据，n为数组长度
for(int i=1;i<=n;i++){
    max=-0x7FFFFFFF;
    for(int j=1;j<=n;j++){
        if(arr1[j]>max){
            max=arr1[j];
            maxi=j;
        }
    }
    arr1[maxi]=-0x7FFFFFFF;
    arr2[k]=max;
    k++;
}
// for(int i=1;i<=n;i++){
//     cout<<arr2[i];
// } //输出
```
从小到大：
```cpp
int arr1[114514],arr2[191981],n,min,mini,k=1;
//假设arr1已经有了数据，n为数组长度
for(int i=1;i<=n;i++){
    min=0x7FFFFFFF;
    for(int j=1;j<=n;j++){
        if(arr1[j]>min){
            min=arr1[j];
            mini=j;
        }
    }
    arr1[mini]=0x7FFFFFFF;
    arr2[k]=min;
    k++;
}
// for(int i=1;i<=n;i++){
//     cout<<arr2[i];
// } //输出
```

## 冒泡排序

时间复杂度：固定$O(n^2)$，具有稳定性。

一个板子：
```cpp
for(int i=2;i<=n;i++){
    for(int j=2;j<=n;j++){
        if(arr[j]>arr[j-1]){ //从小到大则把符号改为<
            int tmp=arr[j];
            arr[j]=arr[j-1];
            arr[j-1]=tmp;
        }
    }
}
```

## 桶排序

较为简单，不稳定，时间复杂度$O(n)$，空间复杂度较高，不适用于结构体和小数。
{% note info flat %}
PS：这个桶排序指标记桶，并不是说分治的那个桶排序

2022.11.16更新

发现标记范围bug，已修正，然而本地能过（试过n=10000的数据规模也没有tle）但是过不了板子题qwq

![1668570918842.png](https://bu.dusays.com/2022/11/16/63745f28348d0.png)
{% endnote %}
```cpp
int arr[114514],bucket[114514],arr2[114514],n,k=1;
//freopen("random.in","r",stdin);
//freopen("random.out","w",stdout); 
scanf("%d",&n);
for(int i=1;i<=n;i++){
	scanf("%d",&arr[i]);
}
//arr指待排序数组，n为长度
for(int i=0;i<114514;i++){
	bucket[i]=0;
}
for(int i=1;i<=n;i++){
	bucket[arr[i]]++;
}
for(int i=0;i<114514;i++){ //从大到小改为for(int i=114513;i>=0;i--)
	for(int j=1;j<=bucket[i];j++){
		arr2[k]=i; //也可以直接输出，写成：cout<<i<<" ";
		k++;
	}
}
// for(int i=1;i<=n;i++){
// 	cout<<arr2[i]<<" ";
// } //输出
```

就是在有序数组中做标记，和稳定完全搭不上边耶欸欸欸。

# 快读快写

这些在一堆数据动不动就TLE的题中很好用，比scanf,printf，cin,cout快

快读板子：
```cpp
inline void read(int &n){
    int x=0,f=1;
    char ch=getchar();
    while(ch<'0'||ch>'9'){
        if(ch=='-') f=-1;
        ch=getchar();
    }
    while(ch>='0'&&ch<='9'){
        x=(x<<1)+(x<<3)+(ch^48);
        ch=getchar();
    }
    n=x*f;
}
```

快写板子：
```cpp
inline void print(int n){
    if(n<0){
        putchar('-');
        n*=-1;
    }
    if(n>9) print(n/10);
    putchar(n % 10 + '0');
}
```

原理就是getchar，然后int和char互转

当然如果要用lld或者int128的话改一下也行的啦

# 求最大公约数

## 穷举

穷举么？雀食可以，不过

# 搜索

搜索虽然我背得模板但是用的不太熟悉qwq，依然是穷举贪心tle，然后助我退役

![1668133472932.png](https://bu.dusays.com/2022/11/11/636db262b913f.png)

![1668133599340.png](https://bu.dusays.com/2022/11/11/636db2e05ff71.png)

![1668133671028.png](https://bu.dusays.com/2022/11/11/636db3281f436.png)

![1668133741932.png](https://bu.dusays.com/2022/11/11/636db36edf885.png)

笑死。

## DFS

DFS比BFS貌似好理解点，因为是递归，一个费stack一个费queue
```cpp
int dfs(int t)
{
    if(满足返回条件)
    {
        return 解;
    }
    else
    {
        for(int i=1;i<=尝试方法数;i++)
            if(满足进一步搜索条件)
            {
                为进一步搜索所需要的状态打上标记;
                dfs(t+1);
                回溯一步;
            }
    }
}
```

## BFS

这个真不会算了...

# DP

no，我不会ヾ(´･ ･｀｡)ノ"

# 数据结构

## 链表

明天再写未完待续...

*(PS：这篇文章充分体现了我OI的垃圾)*
、
、
、
、
、
、
、
、
、
、
、
、
、
、
、
、