const productExceptSelf = (nums) => {

let results  = [] ;

let left = 1
for(let i = 0 ; i<nums.length; i++){
   
    results.push(left) ;

     left = left * nums[i] ;
   

}


let right = 1 ;

for(let i = nums.length-1 ; i>=0 ; i--){
    results[i] = results[i]*right ; 

    right = right*nums[i] ;
}



return results ;
}



console.log(productExceptSelf([-1,1,0,-3,3])) ;