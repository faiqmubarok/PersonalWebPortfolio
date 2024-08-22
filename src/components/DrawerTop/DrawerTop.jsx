import Proptypes from 'prop-types'

const DrawerTop = (drawerActive, onClosedDrawer) => {
  return (
    <>
      <div className="">
        
      </div>

      {/* Overlay */}
      {drawerActive && (
        <div className="bg-white/30 dark:bg-black/30 backdrop-blur-lg dark:backdrop-blur-lg fixed inset-0 z-30" onClick={() => onClosedDrawer()}></div>
      )}
    </>
  )
}

DrawerTop.Proptypes = {
  drawerActive: Proptypes.bool,
  onClosedDrawer: Proptypes.func
}

export default DrawerTop
