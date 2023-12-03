/** Icons are imported separatly to reduce build time */
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import TableCellsIcon from '@heroicons/react/24/outline/TableCellsIcon'
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'
import CodeBracketSquareIcon from '@heroicons/react/24/outline/CodeBracketSquareIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import BoltIcon from '@heroicons/react/24/outline/BoltIcon'
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import ComputerDesktopIcon from '@heroicons/react/24/outline/ComputerDesktopIcon'
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon'

const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const routes = [

  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'Dashboard',
  },
  {
    path: '', //no url needed as this has submenu
    icon: <ComputerDesktopIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'Monitoring', // name that appear in Sidebar
    submenu : [
      {
        path: '/app/nodeone', //url
        icon: <ChartBarIcon className={submenuIconClasses}/>, // icon component
        name: 'Node 25',
      },
      {
        path: '/app/nodetwo', //url
        icon: <ChartBarIcon className={submenuIconClasses}/>, // icon component
        name: 'Node 26',
      },
      {
        path: '', //url
        icon: <ChartBarIcon className={submenuIconClasses}/>, // icon component
        name: 'Node 27',
      }
    ]
  },
  {
    path: '/app/analytics', // url
    icon: <DocumentTextIcon className={iconClasses}/>, // icon component
    name: 'Analytics', // name that appear in Sidebar
  },
  {
    path: '/app/integration', // url
    icon: <BoltIcon className={iconClasses}/>, // icon component
    name: 'Integration', // name that appear in Sidebar
  },
  {
    path: '', //no url needed as this has submenu
    icon: <Cog6ToothIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'Settings', // name that appear in Sidebar
    submenu : [
      {
        path: '/app/settings-profile', //url
        icon: <UserIcon className={submenuIconClasses}/>, // icon component
        name: 'Profile', // name that appear in Sidebar
      },
      {
        path: '/app/settings-billing',
        icon: <WalletIcon className={submenuIconClasses}/>,
        name: 'Billing',
      },
      {
        path: '/app/settings-team', // url
        icon: <UsersIcon className={submenuIconClasses}/>, // icon component
        name: 'Team Members', // name that appear in Sidebar
      },
    ]
  },
  {
    path: '', //no url needed as this has submenu
    icon: <DocumentTextIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'Documentation', // name that appear in Sidebar
    submenu : [
      {
        path: '/app/getting-started', // url
        icon: <DocumentTextIcon className={submenuIconClasses}/>, // icon component
        name: 'Getting Started', // name that appear in Sidebar
      },
      {
        path: '/app/features',
        icon: <TableCellsIcon className={submenuIconClasses}/>, 
        name: 'Features',
      },
      {
        path: '/app/components',
        icon: <CodeBracketSquareIcon className={submenuIconClasses}/>, 
        name: 'Components',
      }
    ]
  },
  
]

export default routes


