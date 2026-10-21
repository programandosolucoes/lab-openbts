FROM debian:bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive

# Instala dependências e utilitários de telecom/voip
RUN apt-get update && apt-get install -y \
    build-essential \
    autoconf \
    automake \
    libtool \
    pkg-config \
    subversion \
    git \
    libspeex-dev \
    libspeexdsp-dev \
    libgsm1-dev \
    libasound2-dev \
    net-tools \
    iproute2 \
    tcpdump \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Clona ou baixa código fonte do Yate
WORKDIR /usr/src
RUN svn checkout http://voip.null.ro/svn/yate/trunk yate || \
    git clone https://github.com/yatevoip/yate.git yate

WORKDIR /usr/src/yate
RUN ./autogen.sh && \
    ./configure --prefix=/usr --sysconfdir=/etc && \
    make -j$(nproc) && \
    make install-noapi

# Cria diretórios de configuração
RUN mkdir -p /etc/yate

# Copia configurações personalizadas
COPY config/extmodule.conf /etc/yate/extmodule.conf
COPY config/ysipchan.conf /etc/yate/ysipchan.conf
COPY config/yate.conf /etc/yate/yate.conf
COPY config/regfile.conf /etc/yate/regfile.conf
COPY config/regexroute.conf /etc/yate/regexroute.conf

EXPOSE 5060/udp 5060/tcp 5039/tcp 16384-16484/udp

CMD ["yate", "-vvvv", "-Dm"]
