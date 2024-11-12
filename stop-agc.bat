set container_name=advanced_software_architecture_and_analysis-asaa-agc-1

:loop
    docker stop %container_name%
    echo Container stopped
    timeout /t 10

    docker start %container_name%
    echo Container started
    timeout /t 10

    goto :loop