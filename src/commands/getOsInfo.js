import os from 'os';

export const getOsInfo = async (arg) => {
  let message = '';

  switch (arg) {
    case '--EOL':
      message = `End of line: ${JSON.stringify(os.EOL)}`;
      break;

    case '--cpus':
      message = getCpusInfo();
      break;

    case '--homedir':
      message = `Homedir: "${os.homedir()}"`;
      break;

    case '--username':
      message = `Username: ${os.userInfo().username}`;
      break;

    case '--architecture':
      message = `Architecture: ${os.arch()}`;
      break;

    default:
      message = 'Invalid input';
      break;
  }

  console.log(message);
};

const getCpusInfo = () => {
  const cpuArr = os.cpus();
  const cpuLength = cpuArr.length;
  let resultOutput = `Amount of CPUS: ${cpuLength}${os.EOL}`;

  cpuArr.forEach((cpu, i) => {
    const cpuModel = cpu.model.trim();
    const cpuRateInGhz = cpu.speed / 1000;
    resultOutput += `${i + 1}) Model: ${cpuModel}, Clock rate: ${cpuRateInGhz} GHz${os.EOL}`;
  });

  return resultOutput;
};

