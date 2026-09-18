
const groupAnagrams = (strs)=>{
      let seen = {} ;
      let anagrams = [] ;


      for(let i = 0; i<strs.length; i++){

        const sorted = strs[i].split("").sort().join("") ; 

        if(seen.hasOwnProperty(sorted)){
            anagrams[seen[sorted]].push(strs[i])
        }else{

        seen[sorted] = anagrams.length ;
        anagrams.push([strs[i]]);
        }

      }

      return anagrams ;



}

console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"])) 