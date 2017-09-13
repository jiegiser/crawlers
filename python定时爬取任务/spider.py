#coding=utf-8

import time,os,urllib2,re,string,sched

#初始化sched模块 scheduler类
schedule = sched.scheduler(time.time,time.sleep)

#爬虫
def Spider():
	request = urllib2.Request("http://bbs.xuegod.cn")
	response = urllib2.urlopen(request)
	reader = response.read()
	#print reader#网页源代码

	usernump = re.compile(r'人数<br><em>.*?</em>')#匹配式
	usernummatch = usernump.findall(reader)
	#print usernummatch

	if usernummatch:
		currentnum = usernummatch[0]
		#print currentnum
		currentnum = currentnum[string.index(currentnum,'>')+5:string.rindex(currentnum,'<')]
		#print currentnum #当前在线人数
		print "当前时间:",time.strftime('%Y年%m月%d日%H时%M分',time.localtime(time.time())),'当前论坛在线人数:',currentnum
		result = open('test.txt','a')
		result.write('{year: new Date('+time.strftime('%Y年%m月%d日%H时%M分',time.localtime(time.time()))+'),value:'+currentnum+'},\n')
		result.close()
#Spider()

#定时
def timing(inc):
	schedule.enter(inc,0,timing,(inc,))
	Spider()

def main(inc=10):
	schedule.enter(0,0,timing,(inc,))
	schedule.run()

if __name__=='__main__':
	main(3)

# intQQ:2384127519
# 了解课程加intQQ
# 公开课上课链接:https://ke.qq.com/course/51375#tuin=8e1ae61f
