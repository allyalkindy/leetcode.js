
const groupAnagrams = (strs)=>{
      let seen = {} ;
      let anagrams = [] ;
      let anagramsIndex = 0 ;


      for(let i = 0; i<strs.length; i++){

        const sorted = strs[i].split("").sort().join("") ; 

        if(seen.hasOwnProperty(sorted)){
            anagrams[seen[sorted]].push(strs[i])
        }else{

        seen[sorted] = anagramsIndex ;
        anagrams[anagramsIndex] = [strs[i]];
        anagramsIndex ++ ;
        }

      }

      return anagrams ;



}

console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"])) 