// Removes the background from the portrait, on-device, with Apple's Vision framework
// (VNGenerateForegroundInstanceMaskRequest, macOS 14+). Nothing is uploaded.
// Usage: swift scripts/cutout.swift <input.jpg> <output.png>
// Only the background is removed; the person's pixels are copied unchanged.
import AppKit
import CoreImage
import Vision

let args = CommandLine.arguments
guard args.count == 3 else {
    FileHandle.standardError.write("usage: swift cutout.swift <input> <output.png>\n".data(using: .utf8)!)
    exit(2)
}

let inputURL = URL(fileURLWithPath: args[1])
let outputURL = URL(fileURLWithPath: args[2])

guard let source = CIImage(contentsOf: inputURL, options: [.applyOrientationProperty: true]) else {
    FileHandle.standardError.write("cannot read \(inputURL.path)\n".data(using: .utf8)!)
    exit(1)
}

let request = VNGenerateForegroundInstanceMaskRequest()
let handler = VNImageRequestHandler(ciImage: source)
try handler.perform([request])

guard let result = request.results?.first else {
    FileHandle.standardError.write("no foreground subject found\n".data(using: .utf8)!)
    exit(1)
}

// Mask for every detected foreground instance, scaled to the source image.
let maskBuffer = try result.generateScaledMaskForImage(forInstances: result.allInstances, from: handler)
let mask = CIImage(cvPixelBuffer: maskBuffer)

let clear = CIImage(color: .clear).cropped(to: source.extent)
guard let blend = CIFilter(name: "CIBlendWithMask") else { exit(1) }
blend.setValue(source, forKey: kCIInputImageKey)
blend.setValue(clear, forKey: kCIInputBackgroundImageKey)
blend.setValue(mask, forKey: kCIInputMaskImageKey)

guard let output = blend.outputImage else { exit(1) }
let context = CIContext()
guard let colorSpace = CGColorSpace(name: CGColorSpace.sRGB) else { exit(1) }
try context.writePNGRepresentation(of: output, to: outputURL, format: .RGBA8, colorSpace: colorSpace)
print("cut-out written: \(outputURL.path) (\(Int(source.extent.width))x\(Int(source.extent.height)), instances: \(result.allInstances.count))")
