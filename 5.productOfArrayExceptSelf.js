const productExceptSelf = (nums) => {

let results  = [] ;

for(let i = 0 ; i<nums.length; i++){
    let curr = 1 ;

    for(let k=0 ; k<nums.length ; k++){

    if(!(k==i)){
    curr = curr*nums[k] ;
    }

}
results.push(curr) ;
}



return results ;



}

console.log(productExceptSelf([1,2,3,4])) ;