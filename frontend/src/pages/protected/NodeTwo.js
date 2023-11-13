import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import NodeTwo from '../../features/monitoring/nodetwo'
import { setPageTitle } from '../../features/common/headerSlice'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Monitoring Node 26"}))
      }, [])


    return(
        <NodeTwo />
    )
}

export default InternalPage