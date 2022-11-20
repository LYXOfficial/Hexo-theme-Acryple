---
title: 高精度算法学习笔记
abbrlink: 74e5e1ec
date: 2022-11-20 21:12:03
tags: 
- OI
categories:
- OI
cover: https://bu.dusays.com/2022/11/20/637a34b2060c2.jpg
description: 114514
---
# 前言

作为一个曾经在BCM摆烂的蒟蒻，趁着网课期间，就恶补一顿吧。

# 为什么会有高精度

咕咕咕。。。

# 一个高精结构体

我还写了个高精结构体

```cpp
struct longint{
	char num[114514]={'0'};
	int sign=0; //标记符号
	void read(){
		char c='0'; //快读
		int i=1;
		while((c<='9'&&c>='0')||c=='-'){
			c=getchar();
			if(c=='-') sign=1;
			else{
				num[i]=c;
				i++;
			}
		}
		num[i]='\0';
		return;
	}
	void print(){
		int n=strlen(num)-1; //快写
		if(n<1) putchar('0');
		if(sign) putchar('-');
		for(int i=1;i<=n;i++){
			putchar(num[i]);
		}
		return;
	}
	bool operator>(longint b){
		if(!sign&&!b.sign) return strcmp(num,b.num)>0;
		else if(!(sign)&&b.sign) return 1;
		else if(sign&&!b.sign) return 0;
		else return strcmp(num,b.num)<0;
	}
	bool operator<(longint b){
		if(!sign&&!b.sign) return strcmp(num,b.num)<0;
		else if(!(sign)&&b.sign) return 0;
		else if(sign&&!b.sign) return 1;
		else return strcmp(num,b.num)>0;
	}
	bool operator<=(longint b){
		if(strcmp(num,b.num)==0&&sign==b.sign) return 1;
		else if(!sign&&!b.sign) return strcmp(num,b.num)<0;
		else if(!(sign)&&b.sign) return 0;
		else if(sign&&!b.sign) return 1;
		else return strcmp(num,b.num)>0;
	}
	bool operator>=(longint b){
		if(strcmp(num,b.num)==0&&sign==b.sign) return 1;
		else if(!sign&&!b.sign) return strcmp(num,b.num)<0;
		else if(!(sign)&&b.sign) return 1;
		else if(sign&&!b.sign) return 0;
		else return strcmp(num,b.num)<0;
	}
	bool operator==(longint b){
		return strcmp(num,b.num)==0&&sign==b.sign;
	}
	longint operator+(longint b2){
		int a[114514],b[114514],c[114514];
		longint c2;
		if(sign==b2.sign){
			if(sign&&b2.sign) c2.sign=1; //同号相加
			int la=strlen(num)-2;
			int lb=strlen(b2.num)-2;
			for(int i=1;i<=la;i++){
				a[la-i+1]=num[i]-'0';
			}
			for(int i=1;i<=lb;i++){
				b[lb-i+1]=b2.num[i]-'0';
			}
			int lc=1,jw=0;
			while(la>=lc||lb>=lc){
				c[lc]=(a[lc]+b[lc])%10+jw;
				jw=(a[lc]+b[lc]+jw)/10;
				lc++;
			}
			if(jw) c[lc++]=jw;
			if(c[lc]==0) lc--;
			for(int i=lc;i>=1;i--){
				c2.num[lc-i+1]=c[i]%10+'0';
			}
			c2.num[lc+1]='\0';
		}
		else{
			//异号相加，尚未实现
			longint b3;
			memcpy(b3.num,num,sizeof(num));
			longint b4;
			memcpy(b4.num,b2.num,sizeof(b2.num));
			if(b3>b4){
				longint t=b3-b4;
				c2=t;
				c2.sign=b3.sign;
			}
			else{
				longint t=b4-b3;
				c2=t;
				c2.sign=b4.sign;
			}
		}
		return c2;
	}
	// void operator++(){
	// 	int jw=1,k=strlen(num)-1;
	// 	while(jw!=0){
	// 		jw=((int)num[k]-'0'+jw)/10;
	// 		num[k]=((int)num[k]-'0'+jw)%10+'0';
	// 		k--;
	// 	}
	// 	return;
	// } //++运算（莫名其妙不能用）
	longint operator-(longint b2){
		int a[114514],b[114514],c[114514],la,lb;
		longint c2;
		if(!b2.sign&&!sign){
			//正数相减
			if(strcmp(num,b2.num)>=0){
				la=strlen(num)-2;
				lb=strlen(b2.num)-2;
				for(int i=1;i<=la;i++){
					a[la-i+1]=num[i]-'0';
				}
				for(int i=1;i<=lb;i++){
					b[lb-i+1]=b2.num[i]-'0';
				}
			}
			else{
				c2.sign=1;
				la=strlen(b2.num)-2;
				lb=strlen(num)-2;
				for(int i=1;i<=la;i++){
					a[la-i+1]=b2.num[i]-'0';
				}
				for(int i=1;i<=lb;i++){
					b[lb-i+1]=num[i]-'0';
				}
			}
			int lc=1,jw=0;
			while(la>=lc||lb>=lc){
				int n=a[lc]-b[lc]-jw;
				if(n<0){
					n+=10;
					jw=1;
				}
				else{
					jw=0;
				}
				c[lc]=n;
				lc++;
			}
			if(jw) c[lc++]=jw;
			while(c[lc]==0) lc--;
			for(int i=lc;i>=1;i--){
				c2.num[lc-i+1]=c[i]%10+'0';
			}
			c2.num[lc+1]='\0';
		}
		else{
			//转加法（初一有理数的加减？！）
			longint b3;
			memcpy(b3.num,num,sizeof(num));
			b3.sign=sign;
			longint b4;
			memcpy(b4.num,b2.num,sizeof(b2.num));
			b4.sign=!sign;
			c2=b3+b4;
		}
		return c2;
	}
	longint operator*(longint b2){
		//高精乘法，咕咕咕
	}
};
```

不过还没有写完咕咕咕。。。

## TODO

没错，我要让她变得跟int\long long\double这些类型一样方便！

{% checkbox checked 快读快写 %}
{% checkbox checked 重载常见运算符 %}
{% checkbox checked 高精加法 %}
{% checkbox checked 高精减法 %}
{% checkbox 高精乘法 %}
{% checkbox 高精除法（高精/低精） %}
{% checkbox 高精除法（高精/高精） %}
{% checkbox 兼容cin/cout、scanf/printf %}
{% checkbox 布尔运算 %}
{% checkbox 高速 %}
{% checkbox 类型转换/兼容 %}
{% checkbox 简易赋值 %}
{% checkbox 支持小数 %}