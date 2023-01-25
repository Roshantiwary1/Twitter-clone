import React from 'react'
import { useRecoilState } from 'recoil';
import { themeState } from '../atom/ThemeAtom';


const Radio = () => {
    const [select, setSelect] = useRecoilState(themeState);
  return (
    <div>
<div className="form-check form-switch">
  <input className="form-check-input mr-2" type="checkbox" checked={!select} role="switch" id="flexSwitchCheckCheckedDisabled" onClick={()=>setSelect(!select)}/>
  <label className="form-check-label sm:font-bold xs:font-light" htmlFor="flexSwitchCheckCheckedDisabled">Dark Mode</label>
</div>
    </div>
  )
}

export default Radio
