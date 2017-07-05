import arcpy
arcpy.env.workspace=""
infc="1.shp"
clipfc="2.shp"
outfc="3.shp"
arcpy.Clip_analysis(infc,clipfc,outfc)