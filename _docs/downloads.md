---
title: Downloads
description: Getting started with LDAK-KVIK
---

# Downloading LDAK

**Please note** that it might be helpful to sign up for the LDAK mailing list:

{% include mail_form.html %}

This will only be used to inform about major updates to LDAK (which happens less than once a year). 

--- 

LDAK-KVIK is included in **LDAK**, a command-line software, that can be run on either Linux or a Mac. We strongly recommend the Linux version, as it will often be much faster than the Mac version. Note that LDAK does not run on Windows, so we suggest using a Linux server (for example, you can use putty to ssh into your local computer cluster). 

There are **four** ways to obtain LDAK: you can install LDAK via a command line, you can manually download the LDAK executable, you can install LDAK via conda, or you can compile your own version of LDAK from the source code.**Please note** that LDAK-KVIK is currently only released on the Linux version of LDAK, the MAC version will soon be released.

## 1. Download via command line

The Linux executable of LDAK can be installed via the command line:
```
wget https://github.com/dougspeed/LDAK/raw/main/ldak6.linux
``` 
The MAC executable of LDAK can be installed via the command line:
```
wget https://github.com/dougspeed/LDAK/raw/main/ldak5.2.mac
```
Note that it might be necessary to grant permission to run the file using `chmod a+x ldak6.linux` (Linux) or `chmod a+x ldak5.2.mac` (Mac).

## 2a. Download the Linux executable

 - Download the Linux executable file from [GitHub](https://github.com/dougspeed/LDAK/blob/main/ldak6.linux) (https://github.com/dougspeed/LDAK/blob/main/ldak6.linux). The file can be downloaded using the hotkey `ctrl+shift+s`, or by selecting 'download' in the three-doted box.

 - Open a terminal window (on my Linux, I go to Applications / System Tools / Terminal)
 - Type the name of the file (for example, /home/doug/Downloads/ldak6.linux), or if you are in the same folder as the executable file, you can simply type ./ldak6.linux. If compatible with your system, this should produce the LDAK welcome screen. 
 
 Note that if your computer tells you that you do not have permission to run the file, then first run `chmod a+x ldak6.linux`

---

## 2b. Download the MAC executable

 - Download the Linux executable file from [GitHub](https://github.com/dougspeed/LDAK/blob/main/ldak5.2.mac) (https://github.com/dougspeed/LDAK/blob/main/ldak5.2.mac). The file can be downloaded using the hotkey `ctrl+shift+s`, or by selecting 'download' in the three-doted box.

 - Open a terminal window (go to Finder / Applications / Utilities)
 - Type the name of the file (for example, Downloads/ldak5.2.mac), or if you are in the same folder as the executable file, you can simply type ./ldak5.2.mac. If compatible with your system, this should produce the LDAK welcome screen. 
 
 Note that if your computer tells you that you do not have permission to run the file, then first run `chmod a+x ldak5.2.mac`

## 3. Install LDAK via conda

(details to come)

## 4a. Compile LDAK from source code (Linux)

The pre-compiled Linux version uses the Intel MKL Libraries. We use the command:

```
gcc --static -O3 -o ldak6.linux ldak/ldak.c ldak/libqsopt.linux.a -m64 -Wl,--start-group ${MKLROOT}/lib/libmkl_intel_lp64.a ${MKLROOT}/lib/libmkl_gnu_thread.a ${MKLROOT}/lib/libmkl_core.a -Wl,--end-group -lgomp -lpthread -lm -ldl -lz -I${MKLROOT}/include -fopenmp -L/home/doug/opt/lib -I/home/doug/opt/include
```

Should you wish to compile a Linux version yourself, please download and unzip the [source code](https://github.com/dougspeed/LDAK) (https://github.com/dougspeed/LDAK), then from inside that folder run a command similar to

```
gcc -O3 -o ldak6 ldak.c libqsopt.linux.a -lblas -llapack -lm -lz -fopenmp
chmod a+x ldak6
```

The exact command will depend on which libraries you have installed. This should take less than a minute to complete. Note that if you do not have Intel MKL Libraries installed, you will be required to turn off the MKL libraries, by editing Line 63 of `ldak.c` (replace #define MKL 1 with #define MKL 0). If you are required to do this, then your self-compiled version will likely be slower than the pre-compiled version.

## 4b. Compile LDAK from source code (Mac)

Should you wish to compile a Linux version yourself, please download and unzip the [source code](https://github.com/dougspeed/LDAK) (https://github.com/dougspeed/LDAK), then from inside that folder run a command similar to

```
gcc -O3 -o ldak5.2.mac ldak.c libqsopt.mac.a -lblas -llapack -lm -lz
chmod a+x ldak5.2.mac
```

The exact command will depend on your system and which libraries you have installed. This should take about a minute to complete. Note that you will be required to turn off the MKL libraries, by editing Line 63 of `ldak.c` (replace #define MKL 1 with #define MKL 0). Further, it may be necessary to add `--framework accelerate` to the above command, and/or to install xcode, by first running the command
```
xcode-select --install
```

<!-- 

LDAK can be installed directly in the Linux terminal using the command lines:

```
wget https://dougspeed.com/wp-content/uploads/ldak6.beta_.zip
unzip ldak6.beta_.zip
```
-->

