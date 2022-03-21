import L from "leaflet";


const getIcon = (role: string): L.Icon<L.IconOptions> => {

  let iconUrl:string = '';
  switch (role) {
    case 'FARMER': {
      iconUrl = iconsUrl.farmer
      break
    }
    case 'DISTRIBUTOR': {
      iconUrl = iconsUrl.distributor
      break
    }
    case 'RETAILER': {
      iconUrl = iconsUrl.retailer
      break
    }
    case 'STOCKIST': {
      iconUrl = iconsUrl.stockist
      break
    }
    default: {
      iconUrl = iconsUrl.farmer
      break
    }
  }
  return L.icon({
    iconUrl,
    iconSize: [30, 30],
  })
}


const iconsUrl = {
  farmer:
    'https://cdn-icons.flaticon.com/png/512/353/premium/353812.png?token=exp=1647864887~hmac=e74d12f103ce1302578d1562a4f76591',
  distributor: 'https://cdn-icons-png.flaticon.com/512/1670/1670929.png',
  retailer:
    'https://cdn-icons.flaticon.com/png/512/3514/premium/3514491.png?token=exp=1647877241~hmac=e35e793906cbe564a393ef5930a0ed5e',
  stockist: 'https://cdn-icons-png.flaticon.com/512/2312/2312763.png',
}


const mapIcons = {
  getIcon
}


export default mapIcons;