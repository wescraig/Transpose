@import 'ui.js'

var userDefaults = NSUserDefaults.alloc().initWithSuiteName("com.wescraig.sketch.transpose");
var userDefaultsDict = userDefaults.dictionaryRepresentation();


var transposeVertical = function(context){
	
	var sketch = context.api()
	var selection = sketch.selectedDocument.selectedLayers
	var rootX, currY, height, gap, shouldShowSettings
	
	shouldShowSettings = parseInt(userDefaultsDict["toDisplay"] !=  null? userDefaultsDict["toDisplay"] : "0")

	if(context.selection.length == 0){
		nothingSelected()
		return 
	}

	// log("gap before: " + userDefaultsDict["margin"])

	if(shouldShowSettings == 0){
		gap = parseInt(showSettings())
	}else{
		gap = parseInt(userDefaultsDict["margin"] !=  null? userDefaultsDict["margin"] : "10")	
	}

	// log("gap after: " + userDefaultsDict["margin"])

	

	for(var i = 0; i < selection.length; i++){

		if(i == 0){
			rootX = context.selection[i].frame().x()
			currY = context.selection[i].frame().y()
			height = context.selection[i].frame().height()
			continue
		}

		context.selection[i].frame().x = rootX
		context.selection[i].frame().y = currY + height + gap

		currY = context.selection[i].frame().y()
		height = context.selection[i].frame().height()

	}


}

var transposeHorizontal = function(context){
	
	var sketch = context.api()
	var selection = sketch.selectedDocument.selectedLayers
	var rootY, currX, width, gap, shouldShowSettings
	gap = parseInt(userDefaultsDict["margin"] !=  null? userDefaultsDict["margin"] : "10")
	shouldShowSettings = parseInt(userDefaultsDict["toDisplay"] !=  null? userDefaultsDict["toDisplay"] : "0")

	if(context.selection.length == 0){
		nothingSelected()
		return 
	}

	// log("gap before: " + userDefaultsDict["margin"])

	if(shouldShowSettings == 0){
		gap = parseInt(showSettings())
	}else{
		gap = parseInt(userDefaultsDict["margin"] !=  null? userDefaultsDict["margin"] : "10")
	}

	// log("gap after: " + userDefaultsDict["margin"])

	// gap = parseInt(userDefaultsDict["margin"] !=  null? userDefaultsDict["margin"] : "10")

	for(var i = 0; i < selection.length; i++){

		if(i == 0){
			rootY = context.selection[i].frame().y()
			currX = context.selection[i].frame().x()
			width = context.selection[i].frame().width()
			continue
		}

		context.selection[i].frame().x = currX + width + gap
		context.selection[i].frame().y = rootY

		currX = context.selection[i].frame().x()
		width = context.selection[i].frame().width()

	}


}

// var snip = function(context){

// 	var sketch = context.api()
// 	var selection = sketch.selectedDocument.selectedLayers

// 	var artboardHeight, toY, lastLayerDeltaY, layerBottomY, testDict

// 	if(context.selection.length == 0){
// 		nothingSelected()
// 		return 
// 	}

// 	for(var i = 0; i < selection.length; i++){
		
// 		if(context.selection[0].isKindOfClass(MSArtboardGroup)){
			
// 			testDict = layerDictionary(selection)
// 			if(Object.keys(testDict).length == 0){
// 				context.document.showMessage("SnipSnap cannot set footer padding with an empty artboard! Please add layers or select a different artboard.")	
// 				return
// 			}

// 			artboardHeight = context.selection[i].frame().height()
// 			toY = prepSnipValues(layerDictionary(selection))
// 			log(toY)
// 			context.selection[i].frame().height = toY		
// 			context.document.showMessage("Snip! Artboard bottom padding is now " + (userDefaultsDict["snip"] !=  null? userDefaultsDict["snip"] : "32") + " pixels.")	
		
// 		}else{
// 			testDict = layerDictionaryNotArtBoard(context.selection[i])
// 			if(Object.keys(testDict).length == 0){
// 				context.document.showMessage("SnipSnap cannot set footer padding with an empty layer! Please add layers or select a different layer.")	
// 				return
// 			}

// 			artboardHeight = context.selection[i].frame().height()
// 			toY = prepSnipValues(layerDictionaryNotArtBoard(context.selection[i]))
// 			layerBottomY = context.selection[i].frame().height() + context.selection[i].frame().y()
// 			lastLayerDeltaY = layerBottomY - toY
// 			context.selection[i].frame().height = artboardHeight - lastLayerDeltaY

// 			context.document.showMessage("Snip! Layer bottom padding is now " + (userDefaultsDict["snip"] !=  null? userDefaultsDict["snip"] : "32") + " pixels.")
		
// 		}
		
// 	}

// };


// var snap = function(context){

// 	if(context.selection.length == 0){
// 		nothingSelected()
// 		return 
// 	}
	
// 	for(var i = 0; i < context.selection.length; i++){

// 		var artboardHeight = context.selection[i].frame().height()

// 		var increaseY = parseInt(userDefaultsDict["snap"] !=  null? userDefaultsDict["snap"] : 100)

// 		context.selection[i].frame().height = artboardHeight + increaseY
// 	}

// 	context.document.showMessage("Snap! Added " + increaseY + " pixels.")


// };


// var layerDictionaryNotArtBoard = function(selection){

// 	var layerDict = {}
// 	var parentArtArray = selection.parentArtboard().layers()
// 	var layerTopY, layerBottomY, selTopY, selBottomY


// 	for(var i = 0; i < parentArtArray.length; i++){

// 		// log(parentArtArray[i])

// 		layerTopY = parentArtArray[i].frame().y()
// 		layerBottomY = parentArtArray[i].frame().y() + parentArtArray[i].frame().height()
// 		selTopY = selection.frame().y()
// 		selBottomY = selection.frame().y() + selection.frame().height()

// 		// log("Layer Top Y: "  + layerTopY + " Layer Bottom Y: " + layerBottomY)
// 		// log("Selection  Top Y: " + selTopY + " Selection Bottom Y: " + selBottomY)
// 		// log((layerTopY > selTopY) && (layerBottomY < selBottomY))

// 		if((layerTopY > selTopY) && (layerBottomY < selBottomY)){
// 			layerDict[layerBottomY] = parentArtArray[i].frame().height()
// 		}


// 	}

// 	return layerDict

// };

// var layerDictionary = function(selection){

// 	var layerDict = {}

// 	selection.iterate(function(layer){

// 		layer.iterate(function(inner){


// 			if(inner.sketchObject.className() == "MSSymbolInstance"){
// 				layerDict[inner.sketchObject.frame().y() + inner.sketchObject.frame().height()] = inner.sketchObject.frame().height()
// 			}else{
// 				layerDict[inner.frame.y + inner.frame.height] = inner.frame.height
// 			}
// 		})
// 	})

// 	log(layerDict)

// 	return layerDict

// };

// var prepSnipValues = function(dict){

// 	var keys = Object.keys(dict)

// 	var maxY = Math.max(...keys)

// 	// var maxHeight = dict[maxY]

// 	// var newY = maxY + maxHeight	

// 	var padding = userDefaultsDict["snip"] !=  null? userDefaultsDict["snip"] : 32

// 	var newYwithPadding = maxY + parseInt(padding)

// 	return newYwithPadding

// };



// var adjustLabelSettings = function(labels){

// 	for(i = 0; i < labels.length; i++){
// 		labels[i].setEditable(false)
// 		labels[i].setSelectable(false)
// 		labels[i].setDrawsBackground(false)
// 		labels[i].setBezeled(false)
// 	}

// 	return labels

// }

var viewSetup = function(view, fields){

	// for (i=0; i < labels.length; i++){
	// 	view.addSubview(labels[i])
	// }
	
	for (i=0; i < fields.length; i++){
		view.addSubview(fields[i])
	}

	return view
}

function nothingSelected(){
	var alert = NSAlert.alloc().init()	
	alert.setMessageText("Nothing is selected")
	alert.setInformativeText("Please select layers to transpose!")
	alert.addButtonWithTitle("Okay!")
	alert.addButtonWithTitle("Close")
	var view = NSView.alloc().initWithFrame(NSMakeRect(0,0,300,100))

	[alert runModal]

}

var showSettings = function(context) {

    var alert = NSAlert.alloc().init()

    // Set Up (Title, Message, Buttons) //
    alert.setMessageText("Transpose Settings")
    alert.setInformativeText("Specify the margin between your selected items.")
    alert.addButtonWithTitle("Okay")
    alert.addButtonWithTitle("Cancel")

    // View Height and Width and Init //
    var viewWidth = 308
    var viewHeight = 50
    var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight))
    var marginOffsetAnchor = 18

    // Text Field Labels Setup //
    var labels = []


    // var snapDefaultLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - marginOffsetAnchor, 100, 20))
    // snapDefaultLabel.setStringValue("Snap Pixels")

    // var snipDefaultLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - (marginOffsetAnchor + 96), 100, 20))
    // snipDefaultLabel.setStringValue("Snip Pixels")

    // var snapDescriptionLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - (marginOffsetAnchor + 128), 300, 100))
    // snapDescriptionLabel.setStringValue("This will the number of pixels added to the bottom of the selection.")

    // var snipDescriptionLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - (marginOffsetAnchor + 224), 300, 100))
    // snipDescriptionLabel.setStringValue("This will be the number of pixels remaining at the bottom of your selection. The rest will be Snipped.")

    // labels.push(snapDefaultLabel, snapDescriptionLabel, snipDefaultLabel, snipDescriptionLabel)

    // labels = adjustLabelSettings(labels);

    // Text Field Setup //

    var fields = []

    var marginField = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - (marginOffsetAnchor), 100, 20))
    marginField.setStringValue(userDefaultsDict["margin"] !=  null? userDefaultsDict["margin"] : "10")

	var displayCheckBx = NSButton.alloc().initWithFrame(NSMakeRect(0, viewHeight - (marginOffsetAnchor * 2 +8), viewWidth - 8, 20))
		displayCheckBx.setButtonType(NSSwitchButton)
		displayCheckBx.setBezelStyle(0)
		displayCheckBx.setTitle("Don't show me this every time")
		displayCheckBx.setState(userDefaultsDict["toDisplay"] !=  null? userDefaultsDict["toDisplay"] : "0")
		// displayCheckBx.setState(NSOffState)
    


    // var snipField = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - (marginOffsetAnchor + 120), 100, 20))
    // snipField.setStringValue(userDefaultsDict["snip"] !=  null? userDefaultsDict["snip"] : "32")


    fields.push(marginField)


    // Add textfields and labels to the view //
    view = viewSetup(view, fields);

    view.addSubview(displayCheckBx)

    // Add view to the alert //
    alert.setAccessoryView(view)
    if (alert.runModal() == 1000){
    	setValuesToMemory(marginField, displayCheckBx)
    	return marginField.stringValue()
    	// context.document.showMessage("Updated SnipSnap Settings!")
    }else{
    	return
    }



}

function setValuesToMemory(setMargin, displayCheckBx){

	[userDefaults setObject:setMargin.stringValue() forKey:"margin"]
	[userDefaults setObject:displayCheckBx.stringValue() forKey:"toDisplay"]

	userDefaults.synchronize()

}
