---
title: aws ec2 인스턴스에 Jenkins 빌드 서버 구축하기
date: 2020-02-24
tags: [aws]
category: infra
---

> 참고
> - [aws project jenkins build server](https://d1.awsstatic.com/Projects/P5505030/aws-project_Jenkins-build-server.pdf)
# AWS EC2 인스턴스를 생성하기

### 1. [Amazon EC2 console](https://console.aws.amazon.com/ec2/)로 이동합니다.

### 2. 우측 상단의 Region을 서울로 설정합니다.

### 3. 키 페어 생성하기
- 키 페어 생성 버튼을 누르면 .pem 파일 형식의 개인키를 다운로드 받을 수 있습니다. 인스턴스 생성, 연결 시 필요하므로 잘 보관해두세요.
![process tree](/assets/images/2020-02-24-img/1.png) 



### 4. EC2 인스턴스 생성

1. EC2 대시보드로 이동한 후 콘솔의 인스턴스 생성 섹션에서 인스턴스 시작을 선택하세요.
![process tree](/assets/images/2020-02-24-img/2.png)

<br/>

2. 단계 1: AMI 선택
  - Amazon Linux AMI 프리 티어 사용 가능한 AMI를 선택하세요.
  ![process tree](/assets/images/2020-02-24-img/3.png) 

<br/>

3. 단계 2: 인스턴스 유형 선택
  - 인스턴스 유형도 프리티어가 사용 가능한 t2.micro를 선택한 후 다음: 인스턴스 세부 정보 구성을 선택하세요.

<br/>

4. 단계 3: 인스턴스 세부 정보 구성
  - 디폴트값을 그대로 사용하므로 다음:스토리지 추가를 선택하세요.

<br/>

5. 단계 4: 스토리지 추가
  - 프리티어는 최대 30GB의 EBS 범용(SSD) 또는 마그네틱 스토리지를 사용할 수 있으므로 크기 항목에 8로 되어있는 것을 30으로 수정하세요. 나머지는 디폴트 값을 유지한 후, 다음:태그 추가를 클릭하세요.

<br/>

6. 단계 5: 태그 추가
  - 여러 인스턴스들이 있을 경우 태그별로 구분하면 검색이나 그룹짓기 편하다고 해요.
![process tree](/assets/images/2020-02-24-img/4.png) 

<br/>

7. 단계 6: 보안 그룹 구성
  - 보안그룹은 inbound와 outbound 트래픽을 인스턴스 레벨에서 컨트롤할 수 있어서 인스턴스의 **방화벽** 역할을 담당합니다.
  - 디폴트로 있는 SSH 유형의 소스를 내 IP로 변경하세요. SSH의 소스를 모든 IPv4(0.0.0.0/0)으로 설정하는 보안상 이유로 추천하지않기 때문입니다.
  - HTTP, HTTPS 유형을 추가하고 소스를 0.0.0.0/0 으로 설정하면 외부 어디서든 웹 서비스에 접근할 수 있습니다.
  ![process tree](/assets/images/2020-02-24-img/5.png) 

<br/>

8. 검토 및 시작 버튼을 클릭한 후 시작 버튼을 선택하세요. 
  - 다음과 같이 기존 키 페어 선택 또는 새 키 페어 생성이 모달이 뜨게 됩니다. 위에서 my-key-pair 이름으로 키 페어를 생성해놨으니 이를 선택한 후 인스턴스 시작을 눌러줍니다.
  ![process tree](/assets/images/2020-02-24-img/6.png) 

9. 인스턴스 상태가 running이 되면 정상적으로 인스턴스 생성 및 실행이 완료된 것입니다! 끝~

![process tree](/assets/images/2020-02-24-img/7.png) 


# Jenkins 구축하기

방금 생성한 EC2 인스턴스에 Jenkins를 구축하겠습니다.

## 1. 보안 그룹 편집하기
> HTTPS 프로토콜 제거와 TCP 설정을 위해 보안 그룹을 편집해야합니다.

 1. 스크롤을 오른쪽으로 해보면 보안그룹 탭이 보입니다. 바로 밑의 링크를 클릭하여 인스턴스의 보안 그룹으로 이동하세요.
  ![process tree](/assets/images/2020-02-24-img/8.png)
  
<br/>

  2. 아래 사진과 같이 EC2 인스턴스를 생성할 때 설정한 보안 그룹의 내용을 확인할 수 있습니다. 이제 편집 버튼을 눌러서 수정을 해봅시다. 
  ![process tree](/assets/images/2020-02-24-img/9.png) 
  
<br/>

  3. HTTPS 프로토콜은 사용하지않으므로 삭제하고 사용자 지정 TCP 규칙을 추가한 후 포트를 8080을 입력합니다.
  ![process tree](/assets/images/2020-02-24-img/10.png) 

## 2. 젠킨스 설치와 설정

### **1단계: windows10에서 ec2 인스턴스에 접속하기**

윈도우 10에는 openssh가 내장되어 있어 ssh 명령어를 사용할 수 있습니다. 윈도우 10에서 아래의 작업을 수행했습니다.

1. my-key-pair.pem 파일이 있는 폴더로 이동합니다.
```
C:\Users\USER>cd C:\Users\USER\github\project\devrami-blog\aws
```

2. 개인키 my-key-pair.pem와 ssh 커맨드로 인스턴스에 접속합니다.
```
ssh -i my-key-pair.pem ec2-user@퍼블릭DNS
```

3. **Are you sure you want to continue connecting
(yes/no)?** 가 뜨면 yes를 입력한 후 엔터를 누르세요.

4. 다음과 같은 문구를 보시면 인스턴스 연결 성공입니다.
 ![process tree](/assets/images/2020-02-24-img/11.png)

5. 텍스트를 자세히 읽어보면 **Run "sudo yum update" to apply all updates.** 를 볼 수 있습니다. 다음과 같이 입력해서 빠르게 업그레이드를 수행하세요.

```
sudo yum update –y
```
> - Yum은 RPM 기반의 시스템을 위한 자동 업데이트 겸 패키지 설치/제거 도구
> - RPM은 원래 레드햇에서 사용되었던 패키지 파일이었지만 현재는 많은 RPM 기반 배포판(RPM 패키지, RPM 패키지 관리 도구)이 사용되고 있다. 즉, RPM을 사용하면 각종 소프트웨어의 설치 및 업데이트를 굉장히 편하게 할 수 있다.

<br/>

### **2단계: 다운로드**

1. yum이 어디에 젠킨스를 설치해야할지 알 수 있도록 젠킨스 레파지토리를 추가해준다.

```
sudo wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkinsci.org/redhat/jenkins.repo
```

2. 패키지를 설치할 수 있게 젠킨스 키 파일을 rpm에 추가한다.

> rpm 포맷은 전자서명을 첨부하여 위변조 여부를 확인할 수 있어 rpm 패키지가 위변조 되며 에러가 발생한다. 다른 제조사가 서명했는데 서명자의 검증용 키가 없을 경우도 검증이 실패하게 되는 데 이럴 경우 --import 옵션을 이용하여 검증용 키를 rpm에 추가해야한다.

```
 sudo rpm --import https://pkg.jenkins.io/redhat/jenkins.io.key
```

3. 젠킨스 설치하기
```
sudo yum install jenkins -y
```

4. 젠킨스 서버 시작하기
```
 sudo service jenkins start
```
> 다음과 같은 에러가 발생하면 자바8로 재설치해야합니다. **Starting jenkins (via systemctl):  Job for jenkins.service failed because the control process exited with error code. See "systemctl status jenkins.service" and "journalctl -xe" for details.**    
> - sudo yum remove java-1.7.0-openjdk
> - sudo yum install java-1.8.0     
> 위 명령을 실행하고 다시 서버를 시작하면 정상적으로 구동이 될 것입니다.

<br/>

### **3단계: 젠킨스 설정**

- 브라우저에서 http://퍼블릭DNS:8080 로 접속하면 아래와 같은 화면이 보일 것입니다.

 ![process tree](/assets/images/2020-02-24-img/12.png)

<br/>

- /var/lib/jenkins/secrets/initialAdminPassword 에 있는 패스워드를 찾은 후 Administrator password에 입력하고 continue 버튼을 클릭합니다.

```
 sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```
<br/>

-  Customize Jenkins 페이지에서 **Install suggested plugins.** 를 선택하여 플러그인을 설치합니다.

- 설치가 완료되면 Create First Admin User 페이지에서 관리자 계정을 생성합니다.

- 완료 후 이 페이지를 볼 수 있을 것입니다.<br/>
 ![process tree](/assets/images/2020-02-24-img/13.png)

 <br/>

 - 왼쪽 편에 있는 Jenkins 관리를 클릭한 후 플러그인 관리를 클릭합니다. 설치 가능 탭에서 **Amazon EC2 plugin**을 재시작없이 설치합니다.
 
 > jenkins 서버에 git이 설치되어있어야 git과 연동할 수 있으므로 다음 명령어로 git을 설치해두자.
 ```
 sudo yum install git
 ```

