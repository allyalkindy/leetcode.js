const isAnagram = (s,t)=>{

    if (s.length !== t.length) return false;

    
   const sSorted = s.split("").sort().join("");
   const tSorted = t.split("").sort().join("");

   return sSorted == tSorted ;


}


console.log(isAnagram("yes","sy")) ;





