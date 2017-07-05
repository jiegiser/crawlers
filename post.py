import urllib
import urllib2
values={"username":"cjieouba@outlook.com","password":"*******"}
data=urllib.urlencode(values)
url="http://passport.csdn.net/account/login?from=http://my.csdn.net/my/mycsdn"
request=urllib2.Request(url,data)
response=urllib2.urlopen(request)
print response.read()