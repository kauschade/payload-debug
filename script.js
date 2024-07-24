function processJSON() {
    const input = document.getElementById('jsonInput').value;
    let jsonData;

    try {
        jsonData = JSON.parse(input);
    } catch (error) {
        alert('JSON inválido!');
        return;
    }

    const output = document.getElementById('output');
    output.innerHTML = '';

    if (jsonData.operationGroups) {
        jsonData.operationGroups.forEach(group => {
            const groupDiv = document.createElement('div');
            groupDiv.classList.add('group');

            const groupHeader = document.createElement('div');
            groupHeader.classList.add('group-header');
            groupHeader.textContent = `Grupo: ${group.description}`;
            groupHeader.onclick = () => toggleContent(groupContent);
            groupDiv.appendChild(groupHeader);

            const groupContent = document.createElement('div');
            groupContent.classList.add('group-content');

            if (group.operations) {
                group.operations.forEach(operation => {
                    const operationDiv = document.createElement('div');
                    operationDiv.classList.add('operation');

                    const operationHeader = document.createElement('div');
                    operationHeader.classList.add('operation-header');
                    operationHeader.textContent = `Operação: ${operation.description}`;
                    operationHeader.onclick = (e) => {
                        e.stopPropagation();
                        toggleContent(operationContent);
                    };
                    operationDiv.appendChild(operationHeader);

                    const operationContent = document.createElement('div');
                    operationContent.classList.add('operation-content');

                    if (operation.restRequest) {
                        const restRequestDiv = document.createElement('div');
                        restRequestDiv.classList.add('structure');

                        const restRequestHeader = document.createElement('div');
                        restRequestHeader.classList.add('structure-header');
                        restRequestHeader.textContent = 'Rest Request';
                        restRequestDiv.appendChild(restRequestHeader);

                        const restRequestInfo = document.createElement('div');
                        restRequestInfo.classList.add('additional-info');
                        restRequestInfo.innerHTML = `
                            <strong>Description:</strong> ${operation.restRequest.description}<br>
                            <strong>Method:</strong> ${operation.restRequest.method}<br>
                            <strong>URL:</strong> <a href="${operation.restRequest.url}" target="_blank">${operation.restRequest.url}</a><br>
                            <strong>Grouped Requisition:</strong> ${operation.restRequest.groupedRequisition}
                        `;
                        restRequestDiv.appendChild(restRequestInfo);

                        operationContent.appendChild(restRequestDiv);
                    }

                    if (operation.structures) {
                        operation.structures.forEach(structure => {
                            const structureDiv = document.createElement('div');
                            structureDiv.classList.add('structure');

                            const structureHeader = document.createElement('div');
                            structureHeader.classList.add('structure-header');
                            const selectName = extractSelectName(structure.sql);
                            structureHeader.textContent = `Estrutura: ${structure.description}: ${selectName ? `@{${selectName}}` : ''}`;
                            structureHeader.onclick = (e) => {
                                e.stopPropagation();
                                toggleContent(structureContent);
                            };
                            structureDiv.appendChild(structureHeader);

                            const structureContent = document.createElement('div');
                            structureContent.classList.add('structure-content');

                            const sqlDiv = document.createElement('div');
                            sqlDiv.classList.add('sql-container');

                            const sqlHeader = document.createElement('div');
                            sqlHeader.classList.add('sql-header');
                            sqlHeader.textContent = 'SQL';
                            sqlHeader.onclick = (e) => {
                                e.stopPropagation();
                                toggleContent(sqlContent);
                            };
                            sqlDiv.appendChild(sqlHeader);

                            const sqlContent = document.createElement('div');
                            sqlContent.classList.add('sql-content');

                            const sqlPre = document.createElement('pre');
                            sqlPre.textContent = formatSQL(structure.sql);
                            sqlContent.appendChild(sqlPre);

                            sqlDiv.appendChild(sqlContent);
                            structureContent.appendChild(sqlDiv);

                            if (structure.resourceType) {
                                const resourceTypeDiv = document.createElement('div');
                                resourceTypeDiv.classList.add('additional-info');
                                resourceTypeDiv.textContent = `Resource Type: ${structure.resourceType}`;
                                structureContent.appendChild(resourceTypeDiv);
                            }

                            if (structure.fromTo) {
                                const fromToDiv = document.createElement('div');
                                fromToDiv.classList.add('from-to');

                                const fromToHeader = document.createElement('div');
                                fromToHeader.classList.add('from-to-header');
                                fromToHeader.textContent = 'From/To';
                                fromToHeader.onclick = (e) => {
                                    e.stopPropagation();
                                    toggleContent(fromToContent);
                                };
                                fromToDiv.appendChild(fromToHeader);

                                const fromToContent = document.createElement('div');
                                fromToContent.classList.add('from-to-content');

                                if (structure.fromTo.fields) {
                                    const fieldsList = document.createElement('ul');
                                    structure.fromTo.fields.forEach(field => {
                                        const listItem = document.createElement('li');
                                        listItem.innerHTML = `<strong>${field.fromDescription}</strong> → ${field.toDescription}`;
                                        fieldsList.appendChild(listItem);
                                    });
                                    fromToContent.appendChild(fieldsList);
                                }

                                fromToDiv.appendChild(fromToContent);
                                structureContent.appendChild(fromToDiv);
                            }

                            if (structure.sql && structure.sql.toUpperCase().startsWith('INSERT INTO')) {
                                const columnsValuesDiv = document.createElement('div');
                                columnsValuesDiv.classList.add('columns-values');

                                const columnsValuesHeader = document.createElement('div');
                                columnsValuesHeader.classList.add('columns-values-header');
                                columnsValuesHeader.textContent = 'Colunas e Valores';
                                columnsValuesHeader.onclick = (e) => {
                                    e.stopPropagation();
                                    toggleContent(columnsValuesContent);
                                };
                                columnsValuesDiv.appendChild(columnsValuesHeader);

                                const columnsValuesContent = document.createElement('div');
                                columnsValuesContent.classList.add('columns-values-content');

                                const columnValuePairs = extractColumnValuePairs(structure.sql);
                                if (columnValuePairs) {
                                    const pairsList = document.createElement('ul');
                                    columnValuePairs.forEach(pair => {
                                        const listItem = document.createElement('li');
                                        listItem.innerHTML = `<strong>${pair.column}</strong> → ${pair.value}`;
                                        pairsList.appendChild(listItem);
                                    });
                                    columnsValuesContent.appendChild(pairsList);
                                }

                                columnsValuesDiv.appendChild(columnsValuesContent);
                                structureContent.appendChild(columnsValuesDiv);
                            }

                            if (structure.executeOrder) {
                                const executeOrderDiv = document.createElement('div');
                                executeOrderDiv.classList.add('additional-info');
                                executeOrderDiv.textContent = `Execute Order: ${structure.executeOrder}`;
                                structureContent.appendChild(executeOrderDiv);
                            }

                            if (structure.condition) {
                                const conditionDiv = document.createElement('div');
                                conditionDiv.classList.add('additional-info');
                                conditionDiv.textContent = `Condition: ${structure.condition}`;
                                structureContent.appendChild(conditionDiv);
                            }

                            const copyBtn = document.createElement('button');
                            copyBtn.textContent = 'Copiar SQL';
                            copyBtn.classList.add('copy-btn');
                            copyBtn.onclick = () => copyToClipboard(structure.sql);
                            structureContent.appendChild(copyBtn);

                            structureDiv.appendChild(structureContent);
                            operationContent.appendChild(structureDiv);
                        });
                    }

                    operationDiv.appendChild(operationContent);
                    groupContent.appendChild(operationDiv);
                });
            }

            groupDiv.appendChild(groupContent);
            output.appendChild(groupDiv);
        });
    } else {
        output.innerHTML = '<p>Nenhum grupo de operações encontrado.</p>';
    }
}

function toggleContent(contentDiv) {
    contentDiv.classList.toggle('open');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then();
}

function formatSQL(sql) {
    return sql;
}

function extractSelectName(sql) {
    const match = sql.match(/--@\{(\w+)\}/);
    return match ? match[1] : '';
}

function extractColumnValuePairs(sql) {
    const match = sql.match(/INSERT INTO \w+ \(([^)]+)\) VALUES \(([^)]+)\)/i);
    if (!match) return null;

    const columns = match[1].split(',').map(column => column.trim());
    const values = match[2].split(',').map(value => value.trim());

    return columns.map((column, index) => ({
        column,
        value: values[index]
    }));
}
