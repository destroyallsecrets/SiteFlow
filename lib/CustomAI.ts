export class MLP {
  inputSize: number;
  hiddenSize: number;
  outputSize: number;
  weightsIH: number[][];
  weightsHO: number[][];
  biasH: number[];
  biasO: number[];

  constructor(inputSize: number, hiddenSize: number, outputSize: number) {
    this.inputSize = inputSize;
    this.hiddenSize = hiddenSize;
    this.outputSize = outputSize;
    
    this.weightsIH = this.createMatrix(hiddenSize, inputSize);
    this.weightsHO = this.createMatrix(outputSize, hiddenSize);
    this.biasH = this.createVector(hiddenSize);
    this.biasO = this.createVector(outputSize);
  }

  createMatrix(rows: number, cols: number) {
    return Array.from({ length: rows }, () => 
      Array.from({ length: cols }, () => Math.random() * 2 - 1)
    );
  }

  createVector(size: number) {
    return Array.from({ length: size }, () => Math.random() * 2 - 1);
  }

  sigmoid(x: number) {
    return 1 / (1 + Math.exp(-x));
  }

  dsigmoid(y: number) {
    return y * (1 - y);
  }

  predict(inputArray: number[]) {
    // Hidden
    let hidden = new Array(this.hiddenSize);
    for (let i = 0; i < this.hiddenSize; i++) {
      let sum = this.biasH[i];
      for (let j = 0; j < this.inputSize; j++) {
        sum += inputArray[j] * this.weightsIH[i][j];
      }
      hidden[i] = this.sigmoid(sum);
    }

    // Output
    let output = new Array(this.outputSize);
    for (let i = 0; i < this.outputSize; i++) {
      let sum = this.biasO[i];
      for (let j = 0; j < this.hiddenSize; j++) {
        sum += hidden[j] * this.weightsHO[i][j];
      }
      output[i] = this.sigmoid(sum);
    }
    return output;
  }
  
  train(inputArray: number[], targetArray: number[], lr: number = 0.1) {
    // Hidden
    let hidden = new Array(this.hiddenSize);
    for (let i = 0; i < this.hiddenSize; i++) {
      let sum = this.biasH[i];
      for (let j = 0; j < this.inputSize; j++) {
        sum += inputArray[j] * this.weightsIH[i][j];
      }
      hidden[i] = this.sigmoid(sum);
    }

    // Output
    let output = new Array(this.outputSize);
    for (let i = 0; i < this.outputSize; i++) {
      let sum = this.biasO[i];
      for (let j = 0; j < this.hiddenSize; j++) {
        sum += hidden[j] * this.weightsHO[i][j];
      }
      output[i] = this.sigmoid(sum);
    }
    
    // Output errors
    let outputErrors = new Array(this.outputSize);
    for (let i = 0; i < this.outputSize; i++) {
      outputErrors[i] = targetArray[i] - output[i];
    }
    
    // Gradients for HO
    let gradientsO = new Array(this.outputSize);
    for (let i = 0; i < this.outputSize; i++) {
      gradientsO[i] = outputErrors[i] * this.dsigmoid(output[i]) * lr;
    }
    
    // Update HO
    for (let i = 0; i < this.outputSize; i++) {
      for (let j = 0; j < this.hiddenSize; j++) {
        this.weightsHO[i][j] += gradientsO[i] * hidden[j];
      }
      this.biasO[i] += gradientsO[i];
    }
    
    // Hidden errors
    let hiddenErrors = new Array(this.hiddenSize).fill(0);
    for (let i = 0; i < this.hiddenSize; i++) {
      let sum = 0;
      for (let j = 0; j < this.outputSize; j++) {
        sum += this.weightsHO[j][i] * outputErrors[j];
      }
      hiddenErrors[i] = sum;
    }
    
    // Gradients for IH
    let gradientsH = new Array(this.hiddenSize);
    for (let i = 0; i < this.hiddenSize; i++) {
      gradientsH[i] = hiddenErrors[i] * this.dsigmoid(hidden[i]) * lr;
    }
    
    // Update IH
    for (let i = 0; i < this.hiddenSize; i++) {
      for (let j = 0; j < this.inputSize; j++) {
        this.weightsIH[i][j] += gradientsH[i] * inputArray[j];
      }
      this.biasH[i] += gradientsH[i];
    }
  }
}

export function trainNetwork(nn: MLP, epochs: number = 1000) {
  const trainingData = [
    // Bright / Blueish = Temp Pole (Outside)
    { input: [0.6, 0.7, 0.9, 0.8], target: [1, 0, 0] },
    { input: [0.5, 0.6, 0.8, 0.7], target: [1, 0, 0] },
    { input: [0.7, 0.8, 1.0, 0.9], target: [1, 0, 0] },
    // Greyish = Subpanel (Metal)
    { input: [0.5, 0.5, 0.5, 0.5], target: [0, 1, 0] },
    { input: [0.6, 0.6, 0.6, 0.6], target: [0, 1, 0] },
    { input: [0.4, 0.4, 0.4, 0.4], target: [0, 1, 0] },
    // High White = 3-Way Switch (Plastic)
    { input: [0.9, 0.9, 0.9, 0.9], target: [0, 0, 1] },
    { input: [0.8, 0.8, 0.8, 0.9], target: [0, 0, 1] },
    { input: [0.95, 0.95, 0.95, 0.9], target: [0, 0, 1] },
    // Low light = Subpanel
    { input: [0.2, 0.2, 0.2, 0.3], target: [0, 1, 0] }
  ];

  for (let i = 0; i < epochs; i++) {
    // Shuffle
    trainingData.sort(() => Math.random() - 0.5);
    for (let data of trainingData) {
      nn.train(data.input, data.target, 0.1);
    }
  }
}

export async function extractImageFeatures(dataUrl: string): Promise<number[]> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve([0,0,0,0]);
      ctx.drawImage(img, 0, 0, 64, 64);
      const data = ctx.getImageData(0, 0, 64, 64).data;
      
      let r = 0, g = 0, b = 0;
      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i+1];
        b += data[i+2];
      }
      
      const count = data.length / 4;
      r = (r / count) / 255; 
      g = (g / count) / 255; 
      b = (b / count) / 255;
      const brightness = (r + g + b) / 3;
      
      resolve([r, g, b, brightness]);
    };
    img.src = dataUrl;
  });
}
