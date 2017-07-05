#计算坡向
import arcpy
from arcpy import env
from arcpy.sa import *
env.workspace=""
outAspect=Aspect()
outAspect.save()
