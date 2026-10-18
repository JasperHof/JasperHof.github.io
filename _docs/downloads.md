---
title: Downloads
description: Getting started with LDAK-KVIK
---

# Download LDAK

For first time users, **please note** that it might be helpful to sign up for the [LDAK mailing list](https://dougspeed.com/downloads/). This will only be used to inform about major updates to LDAK (which happens less than once a year). 

<!--{% include mail_form.html %}-->

--- 

LDAK-KVIK is included in **LDAK**, a command-line software, that can be run on either Linux or a Mac. We strongly recommend the Linux version, as it will often be much faster than the Mac version, and it is the most regularly updated (the Mac executable, conda version, Docker image and source code tend to be a few months behind). Note that LDAK does not run on Windows, so we suggest using a Linux server (for example, you can use putty to ssh into your local computer cluster). 

The latest executables are always listed on the [LDAK GitHub page](https://github.com/dougspeed/LDAK). The Linux executable is named `ldak7.XX.linux`, where XX increases each time the executable is updated; at the time of writing, the latest version is `{{ site.ldak_linux }}`.

There are **five** ways to obtain LDAK, which are listed below.

--- 

### 1. Download via command line

For Linux, open a terminal window (e.g., go to Applications / System Tools / Terminal), then install the Linux executable of LDAK using the command line:
```
wget https://github.com/dougspeed/LDAK/raw/main/{{ site.ldak_linux }}
``` 
For MAC, open a terminal window (go to Finder / Applications / Utilities), then install the Mac executable of LDAK using the command line:
```
curl -L -o {{ site.ldak_mac }} https://github.com/dougspeed/LDAK/raw/main/{{ site.ldak_mac }}
```
Note that it might be necessary to grant permission to run the file using `chmod a+x {{ site.ldak_linux }}` (for Linux) or `chmod a+x {{ site.ldak_mac }}` (for Mac).

--- 

### 2a. Download the Linux executable

 - Download the Linux executable file from [GitHub](https://github.com/dougspeed/LDAK) (https://github.com/dougspeed/LDAK/blob/main/{{ site.ldak_linux }}). The file can be downloaded using the hotkey `ctrl+shift+s`, or by selecting 'download' in the three-dotted box.

 - Open a terminal window (on my Linux, I go to Applications / System Tools / Terminal)
 - Type the name of the file (for example, /home/doug/Downloads/{{ site.ldak_linux }}), or if you are in the same folder as the executable file, you can simply type ./{{ site.ldak_linux }}. If compatible with your system, this should produce the LDAK welcome screen. 
 
 Note that if your computer tells you that you do not have permission to run the file, then first run `chmod a+x {{ site.ldak_linux }}`

### 2b. Download the MAC executable

- Download the Mac executable file from [GitHub](https://github.com/dougspeed/LDAK) (https://github.com/dougspeed/LDAK/blob/main/{{ site.ldak_mac }}). The file can be downloaded using the hotkey `ctrl+shift+s`, or by selecting 'download' in the three-dotted box.

- Open a terminal window (go to Finder / Applications / Utilities)
- Type the name of the file (for example, Downloads/{{ site.ldak_mac }}), or if you are in the same folder as the executable file, you can simply type ./{{ site.ldak_mac }}. If compatible with your system, this should produce the LDAK welcome screen. 

Note that if your computer tells you that you do not have permission to run the file, then first run `chmod a+x {{ site.ldak_mac }}`. You may also have to give your Mac permission to run LDAK within System Settings / Privacy & Security.

--- 

### 3. Install LDAK via conda (Linux systems only)

LDAK can be installed via conda as follows:

```
# create a new environment and install LDAK
conda create -n ldak_env -c genomedk ldak6

# load the new environment 
conda activate ldak_env

# check LDAK starts
ldak6
```

The final command should display an overview of the LDAK commands. Note that all our examples use `{{ site.ldak_linux }}` to run LDAK-KVIK, which should be replaced by `ldak6` if installed via conda.

--- 

### 4. Install LDAK via Docker

LDAK can be run inside a Docker container (you should first install Docker on your computer). The image can be downloaded from Docker Hub:
```
docker pull {{ site.ldak_docker }}
```
Alternatively, download the [LDAK GitHub repository](https://github.com/dougspeed/LDAK), navigate into the directory, and run `docker build -t ldak .`

LDAK can then be run inside Docker, mounting the current working directory as the `output` location:
```
docker run --rm -v $(pwd):/output {{ site.ldak_docker }}
```
This can be followed with a list of arguments (e.g., `--bfile geno --calc-stats stats`). If you are working in Windows PowerShell, `$(pwd)` should be replaced with `${PWD}`.

--- 

### 5a. Compile LDAK from source code (Linux)

Should you wish to compile a Linux version yourself, please download and extract the file `Source_Code.zip` from [GitHub](https://github.com/dougspeed/LDAK), then from inside the `Source_Code` folder run a command similar to

```
gcc -O3 -o ldak6.3 ldak_nomkl.c libqsopt.linux.a -lblas -llapack -lm -lz -fopenmp -lzstd
chmod a+x ldak6.3
```

The exact command will depend on which libraries you have installed. Sometimes it is necessary to add the option `-no-pie`, while adding `-Wformat-overflow=0` reduces the warnings. Note that this version will likely be slower than the pre-compiled Linux version, because it does not use the Intel MKL libraries.

### 5b. Compile LDAK from source code (Mac)

Should you wish to compile a Mac version yourself, please download and extract the file `Source_Code.zip` from [GitHub](https://github.com/dougspeed/LDAK), then from inside the `Source_Code` folder run one of the following commands (the second compiles a slightly reduced version of LDAK, which is unable to compute LDAK weightings)

```
gcc -O3 -o ldak6.3 ldak_nomkl.c libqsopt.mac.a -lblas -llapack -lm -lz -lzstd
```
```
gcc -O3 -o ldak6.3 ldak_nomkl_noqsopt.c -lblas -llapack -lm -lz -lzstd
```
then run `chmod a+x ldak6.3`. The exact command will depend on your system and which libraries you have installed. It may be necessary to install xcode, by first running the command
```
xcode-select --install
```

### 5c. Compile LDAK with Intel MKL (Linux)

The pre-compiled Linux version uses the Intel MKL libraries (from the 2024 version of [oneAPI](https://www.intel.com/content/www/us/en/developer/tools/oneapi/onemkl.html)), which provide highly-efficient algebraic routines. We compile it using the commands:

```
source intel/oneapi/setvars.sh
gcc --static -static-libgcc -O3 -o {{ site.ldak_linux }} ldak/ldak_mkl.c ldak/libqsopt.linux.a -m64 -Wl,--start-group ${MKLROOT}/lib/libmkl_intel_lp64.a \
${MKLROOT}/lib/libmkl_gnu_thread.a ${MKLROOT}/lib/libmkl_core.a -Wl,--end-group -lgomp -lpthread -lm -ldl -lz -lzstd -I${MKLROOT}/include -fopenmp
```
Note that the first command depends on where you installed oneAPI.

<!-- 

LDAK can be installed directly in the Linux terminal using the command lines:

```
wget https://dougspeed.com/wp-content/uploads/ldak6.beta_.zip
unzip ldak6.beta_.zip
```
-->

