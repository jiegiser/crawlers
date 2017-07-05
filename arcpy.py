import arcpy
aprx = arcpy.mp.ArcGISProject("current")
map = aprx.listMaps()[0]
censusLayer = map.listLayers('Census Block Groups')[0]
c = arcpy.Chart('MyChart')
c.type = 'scatter'
c.title = 'Relationship between Percent Vacant (Housing) and Population Density'
c.description = 'This chart examines the relationship between housing vacancy and population density.'
c.xAxis.field = 'Per_Vacant'
c.yAxis.field = 'Pop_Density'
c.xAxis.title = 'Vacant Housing %'
c.yAxis.title = 'Population Density (per Sq. Mile)'
c.xAxis.sort = 'DESC'
c.addToLayer(censusLayer)