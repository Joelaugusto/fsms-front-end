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
      iconUrl = iconsUrl.default
      break
    }
  }
  return L.icon({
    iconUrl,
    iconSize: [30, 30],
  })
}


const iconsUrl = {
  farmer: 'https://cdn-icons-png.flaticon.com/512/424/424056.png',
  distributor: 'https://cdn-icons-png.flaticon.com/512/948/948615.png',
  retailer: 'https://cdn-icons-png.flaticon.com/512/4290/4290854.png',
  stockist: 'https://cdn-icons-png.flaticon.com/512/2897/2897808.png',
  default: 'https://cdn-icons-png.flaticon.com/512/252/252025.png',
}


const mapIcons = {
  getIcon
}


export default mapIcons;