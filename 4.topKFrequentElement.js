const topKFrequent = (nums,k) =>{

let elementsCounts = {}

for(let i = 0 ; i<nums.length ; i++){
    elementsCounts[nums[i]] = (elementsCounts[nums[i]] || 0) + 1 ;
}

const keys = Object.keys(elementsCounts).map(Number) ;
const values = Object.values(elementsCounts) ;

let frequents = [] ; 


for(let i = 0 ; i<k ; i++ ){
    const freqValue = Math.max(...values) ;
    const valueIndex = values.indexOf(freqValue)
    values.splice(valueIndex,1) ;

    const freqKey = keys.find(k => elementsCounts[k] === freqValue)
    const keyIndex = keys.indexOf(freqKey) ;

    frequents.push(freqKey) ;
    keys.splice(keyIndex,1) ; 

}




return frequents;



}

console.log(topKFrequent([1,1,1,2,2,3],2))
console.log(topKFrequent([1,2,1,2,1,2,3,1,3,2],2))