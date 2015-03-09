function HomeCtrl($scope,Product)
{
	// Product.ProductAllFind().get(function(data)
	// {
	// 	if(data.result==200)
	// 	{
	// 		console.log(data.data)
	// 		$scope.prod = data.data;
	// 	}
	// 	else
	// 	{

	// 	}
	// })
	
}

function RedirectUserLoginCtrl($scope,$window)
{	
	$window.location.href="user/#/login";
}