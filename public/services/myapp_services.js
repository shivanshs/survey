var Services_myapp = angular.module('MyApp_Services',['ngResource'])

Services_myapp.factory('Product',function ($resource)
{
	return	{	
		ProductAllFind : function()
		{
			return $resource('/ProductAllFind')
		}
	}
})