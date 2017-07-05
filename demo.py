import urllib2
#构造Request需要传入Url，Data。
request=urllib2.Request("https://www.arcgis.com/home/webmap/viewer.html")
response=urllib2.urlopen(request)#ulopen参数可以传入一个request请求，它就是一个Request实例。
print response.read()