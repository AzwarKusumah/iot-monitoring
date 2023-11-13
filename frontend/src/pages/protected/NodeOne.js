import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import NodeOne from '../../features/monitoring/nodeone'
import { setPageTitle } from '../../features/common/headerSlice'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Monitoring Node 25"}))
      }, [])


    return(
        <NodeOne />
    )
}

export default InternalPage