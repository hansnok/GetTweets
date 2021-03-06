import Spacing from 'material-ui/styles/spacing'
import zIndex from 'material-ui/styles/zIndex'
import { blue500, blue700, lightBlack, pinkA200, grey100, grey500, darkBlack, white, grey300, cyan500 } from 'material-ui/styles/colors'

const theme = {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: "'Source Sans Pro', sans-serif",
  palette: {
    primary1Color: blue500,
    primary2Color: blue700,
    primary3Color: lightBlack,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,

    // DisabledColor: ColorManipulator.fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500
  }
}

export default theme
