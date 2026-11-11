import { Question } from '../types';

export const HCIA_OPENGAUSS_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Which of the following support libraries in the openGauss driver package maintains compatibility?",
    options: [
      "Oracle",
      "MySQL",
      "PostgreSQL",
      "DB2"
    ],
    correctAnswer: 2,
    category: "Architecture & Engines",
    difficulty: "Foundation",
    keyConcept: "PostgreSQL Ecosystem & Driver Compatibility",
    explanation: "openGauss is deeply compatible with PostgreSQL ecosystem drivers and standard interfaces (including libpq, JDBC, ODBC, and Python adapters). This enables seamless migration and toolchain integration."
  },
  {
    id: 2,
    question: "Row-level access control refines database access control down to the table row level. Which of the following types of SQL is not affected by row-level access control?",
    options: [
      "Delete",
      "Select",
      "Insert",
      "Update"
    ],
    correctAnswer: 2,
    category: "Security & Access Control",
    difficulty: "Core",
    keyConcept: "Row-Level Security (RLS) Filtering Scope",
    explanation: "Row-level access control (Row-Level Security / RLS) filters which existing rows can be viewed or modified by SELECT, UPDATE, and DELETE queries based on security policies. Standard INSERT statements insert brand new rows and are governed by schema privileges and check constraints, not row-reading filters."
  },
  {
    id: 3,
    question: "Which of the following statements is used to retrieve data from a table or view?",
    options: [
      "DROP",
      "UPDATE",
      "SELECT",
      "DELETE"
    ],
    correctAnswer: 2,
    category: "SQL & Schema Operations",
    difficulty: "Foundation",
    keyConcept: "SQL DML & Query Statements",
    explanation: "The SELECT statement is the standard Data Query Language (DQL) command used to retrieve, project, and aggregate records from database tables or views."
  },
  {
    id: 4,
    question: "Which thread is responsible for copying dirty page data to the double-write area and writing it to disk, and then forwarding the dirty page to the bgwriter child thread for data write-to-disk operation?",
    options: [
      "bgwriter thread",
      "PageWriter thread",
      "checkpointer thread",
      "walwriter thread"
    ],
    correctAnswer: 1,
    category: "Architecture & Engines",
    difficulty: "Advanced",
    keyConcept: "openGauss Dual-Write & PageWriter Thread Mechanism",
    explanation: "In openGauss, the PageWriter thread handles the double-write mechanism: it writes dirty shared buffer pages into the double-write area (dw) on disk first to prevent half-written page corruption, and dispatches write-back tasks to child threads."
  },
  {
    id: 5,
    question: "Which of the following descriptions about users and roles is correct?",
    options: [
      "A user can only be assigned one role.",
      "Users are behaviors, roles are entities.",
      "A role is a set of permissions that should include the ability to log in to the database and execute SQL without grant.",
      "Managing user permissions can be simplified to managing role-based permissions."
    ],
    correctAnswer: 3,
    category: "Security & Access Control",
    difficulty: "Foundation",
    keyConcept: "Role-Based Access Control (RBAC)",
    explanation: "Under the Role-Based Access Control (RBAC) model, permissions are granted directly to roles, and roles are then granted to users. This centralizes and greatly simplifies authorization management compared to individual user grants."
  },
  {
    id: 6,
    question: "Which of the following is NOT a complete deployment solution for openGauss?",
    options: [
      "Dual-master deployment",
      "One primary and one backup deployment",
      "Standalone deployment",
      "One primary and multiple backup deployment"
    ],
    correctAnswer: 0,
    category: "Deployment & High Availability",
    difficulty: "Core",
    keyConcept: "openGauss Architecture & HA Deployment Topologies",
    explanation: "openGauss enterprise HA topologies support: 1) Standalone (single node), 2) One primary and one standby (1P1S), and 3) One primary and multiple standbys (1P2S or quorum 1P4S). It does NOT support multi-master or dual-master active-active topologies."
  },
  {
    id: 7,
    question: "openGauss integrates anomaly_detection, a tool that can be used for database metric collection, prediction, and anomaly monitoring and diagnosis. Which of the following descriptions about anomaly_detection is incorrect?",
    options: [
      "anomaly_detection can monitor multiple metrics simultaneously and predict the future trend of each metric.",
      "anomaly_detection consists of two parts: agent and detector.",
      "The agent module of anomaly_detection can be deployed on different servers from the openGauss database environment.",
      "The detector module of anomaly_detection communicates with the agent module via HTTP or HTTPS."
    ],
    correctAnswer: 2,
    category: "Database Tools & O&M",
    difficulty: "Core",
    keyConcept: "AI Diagnostic Engine: anomaly_detection",
    explanation: "The agent module of anomaly_detection must be co-located on the same host where the openGauss database instance resides in order to gather local system metrics, process logs, and database metrics directly."
  },
  {
    id: 8,
    question: "Which of the following commonly used data types is aliased as INT4?",
    options: [
      "TINYINT",
      "SMALLINT",
      "INTEGER",
      "BIGINT"
    ],
    correctAnswer: 2,
    category: "Storage & Data Types",
    difficulty: "Foundation",
    keyConcept: "openGauss Integer Data Types",
    explanation: "In openGauss and SQL standard: INT1 = TINYINT (1 byte), INT2 = SMALLINT (2 bytes), INT4 = INTEGER / INT (4 bytes, signed range -2^31 to 2^31-1), and INT8 = BIGINT (8 bytes)."
  },
  {
    id: 9,
    question: "Which of the following keywords indicates that if there are objects that depend on this DataSource, then the DataSource cannot be deleted?",
    options: [
      "src_name",
      "CASCADE",
      "RESTRICT",
      "IFEXISTS"
    ],
    correctAnswer: 2,
    category: "SQL & Schema Operations",
    difficulty: "Core",
    keyConcept: "DROP Object Dependency Constraints",
    explanation: "RESTRICT prevents the dropping of an object if any other database objects depend on it. In contrast, CASCADE automatically drops all dependent objects together."
  },
  {
    id: 10,
    question: "In openGauss, which of the following permissions do all created users and roles have by default?",
    options: [
      "admin",
      "dba",
      "PUBLIC",
      "administrator"
    ],
    correctAnswer: 2,
    category: "Security & Access Control",
    difficulty: "Foundation",
    keyConcept: "openGauss Default Pseudo-Role: PUBLIC",
    explanation: "In openGauss, 'PUBLIC' is an implicitly created system pseudo-role. Any privilege granted to PUBLIC is automatically inherited by every existing and future user or role."
  },
  {
    id: 11,
    question: "Which of the following is the configuration file for openGauss control parameters?",
    options: [
      "pg_log",
      "pg_xlog",
      "postgresql.conf",
      "pg_hba.conf"
    ],
    correctAnswer: 2,
    category: "Database Tools & O&M",
    difficulty: "Foundation",
    keyConcept: "openGauss Engine Configuration Files",
    explanation: "postgresql.conf is the primary configuration file containing operational parameters (GUC parameters) such as memory, connections, logging, and performance knobs. pg_hba.conf handles host-based client authentication."
  },
  {
    id: 12,
    question: "Which of the following type conversion functions is used to convert x to the type specified by y?",
    options: [
      "hextoraw(string)",
      "cast (x as y)",
      "pg_systimestamp()",
      "to_bigint(varchar)"
    ],
    correctAnswer: 1,
    category: "SQL & Schema Operations",
    difficulty: "Foundation",
    keyConcept: "SQL Standard Explicit Casting: CAST",
    explanation: "The ANSI SQL standard function 'cast(x as y)' or the PostgreSQL/openGauss shorthand syntax 'x::y' explicitly converts expression x into target data type y."
  },
  {
    id: 13,
    question: "Regarding update operations on columnstores, which of the following statements is incorrect?",
    options: [
      "Columnar tables support the RETURNING clause.",
      "An error will occur when updating one row of a columnstore with multiple rows of data.",
      "Update operations on columnstores do not reclaim space from old records.",
      "Column-store tables do not support updates with uncertain results."
    ],
    correctAnswer: 0,
    category: "Storage & Data Types",
    difficulty: "Advanced",
    keyConcept: "openGauss Columnar Storage Update Limitations",
    explanation: "Columnar tables in openGauss do NOT support the RETURNING clause in UPDATE/INSERT statements. Old row data remains in CU (Compression Unit) until VACUUM FULL reclaims space."
  },
  {
    id: 14,
    question: "ALTER DATABASE database_name RENAME TO new_name: What is the function of the above SQL statement?",
    options: [
      "Change the tablespace owner",
      "Modify tablespace name",
      "Change the database name",
      "Change the database owner"
    ],
    correctAnswer: 2,
    category: "SQL & Schema Operations",
    difficulty: "Foundation",
    keyConcept: "DDL Database Modification Syntax",
    explanation: "'ALTER DATABASE dbname RENAME TO newname' renames an existing database. Only the database owner or a system administrator can execute this command while no other active connections exist."
  },
  {
    id: 15,
    question: "Database administrator Xiaohai wants to view the statistics of DML statements in the database at the current point in time. Which of the following system views can he view?",
    options: [
      "PG_STATS",
      "PG_STAT_ACTIVITY",
      "GS_SQL_COUNT",
      "GS_SESSION_STAT"
    ],
    correctAnswer: 2,
    category: "Database Tools & O&M",
    difficulty: "Core",
    keyConcept: "System Monitoring Views: GS_SQL_COUNT",
    explanation: "GS_SQL_COUNT records statistics on the execution count of various SQL statement types (SELECT, INSERT, UPDATE, DELETE, MERGE INTO, DDL) across the current database instance."
  },
  {
    id: 16,
    question: "Xiaohai wants to use gs_dump to export data in both hr and public schemas simultaneously. Which of the following parameter settings can he use?",
    options: [
      "-n hr public",
      "-n hr,public",
      "-n hr -n public",
      "-n hr/public"
    ],
    correctAnswer: 2,
    category: "Database Tools & O&M",
    difficulty: "Core",
    keyConcept: "gs_dump Schema Selection Arguments",
    explanation: "In gs_dump, multiple schemas are exported by supplying the -n (or --schema) flag repeatedly for each desired schema: 'gs_dump -n hr -n public ...'."
  },
  {
    id: 17,
    question: "Which of the following services can provide the functions of collecting, storing, and querying operation records for various cloud resources?",
    options: [
      "UGO",
      "CTS",
      "DRS",
      "DAS"
    ],
    correctAnswer: 1,
    category: "Database Tools & O&M",
    difficulty: "Foundation",
    keyConcept: "Cloud Trace Service (CTS)",
    explanation: "CTS (Cloud Trace Service) tracks and logs operational requests and user actions on cloud resources. DRS is Data Replication Service, DAS is Database Admin Service, and UGO is Database and Application Migration UGO."
  },
  {
    id: 18,
    question: "When the gs_dump and gs_dumpall tools are exporting data, other users can perform read and write operations on the database.",
    options: [
      "TRUE",
      "FALSE"
    ],
    correctAnswer: 0,
    category: "Database Tools & O&M",
    difficulty: "Core",
    keyConcept: "gs_dump MVCC Online Backup Non-blocking Mechanism",
    explanation: "TRUE. gs_dump leverages MVCC transaction snapshots. It only acquires ACCESS SHARE locks on tables, allowing concurrent SELECT, INSERT, UPDATE, and DELETE operations to proceed unhindered."
  },
  {
    id: 19,
    question: "Which of the following type conversion functions converts the specified parameter to the number type?",
    options: [
      "to_number(n[,fmt])",
      "to_date(exp[,fmt])",
      "to_char(int, text)",
      "to_clob(str)"
    ],
    correctAnswer: 0,
    category: "SQL & Schema Operations",
    difficulty: "Foundation",
    keyConcept: "Data Type Formatting & Conversion Functions",
    explanation: "to_number(string, format) converts a string representation into a numeric value according to the specified format pattern."
  },
  {
    id: 20,
    question: "When was openGauss released as an open-source application?",
    options: [
      "2019",
      "2020",
      "2021",
      "2022"
    ],
    correctAnswer: 1,
    category: "Architecture & Engines",
    difficulty: "Foundation",
    keyConcept: "openGauss Open-Source Milestone",
    explanation: "Huawei officially released openGauss to the open-source community on June 30, 2020, establishing the openGauss open-source community."
  },
  {
    id: 21,
    question: "Which of the following components of GaussDB (for openGauss) is a consistency component?",
    options: [
      "CMS",
      "ETCD",
      "DN",
      "CN"
    ],
    correctAnswer: 1,
    category: "Deployment & High Availability",
    difficulty: "Core",
    keyConcept: "Distributed Consensus: ETCD",
    explanation: "ETCD implements the Raft consensus protocol to maintain globally consistent metadata, cluster configuration state, and distributed locks for GaussDB distributed clusters."
  },
  {
    id: 22,
    question: "GaussDB (for openGauss) employs NUMA-Aware technology to significantly improve database performance. In which aspects are the algorithm optimizations reflected?",
    options: [
      "Reduce thread access conflicts",
      "Reduce single-point bottlenecks",
      "Reduce computational overhead",
      "Reduce cross-core access"
    ],
    correctAnswer: 0,
    category: "Architecture & Engines",
    difficulty: "Advanced",
    keyConcept: "NUMA-Aware Algorithm Optimization",
    explanation: "Algorithm optimization in openGauss NUMA-Aware architecture focuses on reducing thread lock competition and access conflicts (e.g. partition locks, CGroup binding), whereas data partitioning optimization addresses cross-core memory access."
  },
  {
    id: 23,
    question: "For a system with high business continuity, which of the following characteristics should its RTO (Recovery Time Objective) and RPO (Recovery Point Objective) possess?",
    options: [
      "RTO is high, RPO is low",
      "Higher RTO, higher RPO",
      "Both RTO and RPO are low.",
      "Lower RTO, higher RPO"
    ],
    correctAnswer: 2,
    category: "Deployment & High Availability",
    difficulty: "Foundation",
    keyConcept: "Disaster Recovery Metrics: RTO & RPO",
    explanation: "A high-availability, business-critical system demands both low RTO (minimal downtime before restoration) and low RPO (minimal to zero data loss during failure failover)."
  },
  {
    id: 24,
    question: "Which of the following descriptions about the gs_dump tool is incorrect?",
    options: [
      "The gs_dump tool is executed by the operating system user omm.",
      "The gs_dump tool supports exporting complete and consistent data.",
      "gs_dump supports exporting database information to plain text SQL script files or other archive files.",
      "When the gs_dump tool is exporting data, other users cannot access the openGauss database."
    ],
    correctAnswer: 3,
    category: "Database Tools & O&M",
    difficulty: "Core",
    keyConcept: "gs_dump Concurrency & Operation Principles",
    explanation: "gs_dump does NOT block database access; other users and application sessions can read and modify the database concurrently thanks to MVCC read snapshot isolation."
  },
  {
    id: 25,
    question: "GaussDB (for openGauss) uses NUMA-Aware technology to greatly improve database performance. In which aspects is the optimization for data partitioning reflected?",
    options: [
      "Reduce single-point bottlenecks",
      "Reduce computational overhead",
      "Reduce thread access conflicts",
      "Reduce cross-core access"
    ],
    correctAnswer: 3,
    category: "Architecture & Engines",
    difficulty: "Advanced",
    keyConcept: "NUMA Data Partitioning Optimization",
    explanation: "Data partitioning allocates and binds memory pages to the local NUMA node of the executing CPU thread, directly reducing remote cross-node / cross-core memory bus accesses."
  },
  {
    id: 26,
    question: "Slow SQL can record information on all jobs that have completed execution after exceeding the set execution time threshold. If the administrator needs to adjust the value, which parameter needs to be modified?",
    options: [
      "log_min_duration_statement",
      "log_minerror_statement",
      "errorlog_min_durationstatement",
      "log_duration"
    ],
    correctAnswer: 0,
    category: "Database Tools & O&M",
    difficulty: "Core",
    keyConcept: "Slow Query Logging Parameter",
    explanation: "log_min_duration_statement defines the duration threshold (in milliseconds) above which SQL statements will be logged as slow queries. Setting it to 0 logs all statements, while -1 disables it."
  },
  {
    id: 27,
    question: "Before generating a WDR (Workload Diagnosis Report), it is necessary to confirm that snapshot information exists in the database. What is the minimum number of snapshots required?",
    options: [
      "3",
      "2",
      "1",
      "41"
    ],
    correctAnswer: 1,
    category: "Database Tools & O&M",
    difficulty: "Foundation",
    keyConcept: "WDR Workload Diagnosis Report Snapshots",
    explanation: "A Workload Diagnosis Report (WDR) compares statistical deltas between an earlier starting snapshot and a later ending snapshot, requiring at least 2 snapshots."
  },
  {
    id: 28,
    question: "Which of the following is NOT a data type supported by dense-state equality queries?",
    options: [
      "varchar2(n)",
      "blob",
      "bigint",
      "arrays"
    ],
    correctAnswer: 1,
    category: "Security & Access Control",
    difficulty: "Advanced",
    keyConcept: "Dense-State / Encrypted Database Capabilities",
    explanation: "openGauss full-encryption / dense-state database supports deterministic equality query on integer, character, and structured types, but does NOT support binary large objects (BLOB) for dense equality searching."
  },
  {
    id: 29,
    question: "What are the core functions of the CM (Cluster Manager) module in a database cluster?",
    options: [
      "Manage and monitor the operation of each functional unit and physical resource in the distributed system to ensure the stable operation of the entire system.",
      "Provide management interfaces and tools for daily cluster operation and maintenance and configuration management.",
      "Responsible for generating and maintaining globally unique information such as global transaction IDs, transaction snapshots, timestamps, and sequence information.",
      "Responsible for receiving access requests from applications and returning execution results to clients; responsible for decomposing tasks and scheduling task shards."
    ],
    correctAnswer: 0,
    category: "Deployment & High Availability",
    difficulty: "Core",
    keyConcept: "Cluster Manager (CM) Role",
    explanation: "The CM (Cluster Manager) monitors the heartbeats of nodes, functional units, and hardware resources, orchestrating failover, node arbitration, and cluster state management."
  },
  {
    id: 30,
    question: "NUMA distance refers to the physical distance between processor sockets and memory nodes in a NUMA architecture. Which of the following tools can be used to query CPU access distance information?",
    options: [
      "coreinfo",
      "numactl",
      "numastat",
      "numacheck"
    ],
    correctAnswer: 1,
    category: "Architecture & Engines",
    difficulty: "Core",
    keyConcept: "NUMA Distance Diagnostics Tool",
    explanation: "The 'numactl --hardware' command displays CPU node topology along with the inter-node NUMA distance matrix (access latency cost)."
  },
  {
    id: 31,
    question: "Which of the following GaussDB (for openGauss) components processes data according to the execution plan?",
    options: [
      "DN",
      "CN",
      "GTM",
      "OM"
    ],
    correctAnswer: 0,
    category: "Architecture & Engines",
    difficulty: "Core",
    keyConcept: "Distributed Components: Data Node (DN)",
    explanation: "DN (Data Node) stores actual relational table data and executes the physical query execution plan (scans, joins, aggregations). CN (Coordinator Node) parses SQL and distributes plans."
  },
  {
    id: 32,
    question: "In openGauss, system tables and all built-in data types, functions, and operators belong to which schema?",
    options: [
      "pg_catalog",
      "pg_temp",
      "information_schema",
      "public"
    ],
    correctAnswer: 0,
    category: "SQL & Schema Operations",
    difficulty: "Foundation",
    keyConcept: "System Catalog Schema: pg_catalog",
    explanation: "The pg_catalog schema houses all internal system tables, catalog views, built-in data types, and internal functions in openGauss."
  },
  {
    id: 33,
    question: "Which of the following descriptions about the gs_ssh tool is incorrect?",
    options: [
      "gs_ssh can only execute commands that the current database user has permission to execute.",
      "Commands executed by gs_ssh will affect the currently running session.",
      "The command can be found using `which` and has execute permissions under the current user.",
      "The gs_ssh command needs to be executed as the operating system user omm."
    ],
    correctAnswer: 1,
    category: "Database Tools & O&M",
    difficulty: "Core",
    keyConcept: "Cluster Remote Execution: gs_ssh",
    explanation: "gs_ssh spawns isolated non-interactive subshells across target cluster nodes; commands executed via gs_ssh do NOT hijack, modify, or corrupt existing interactive user terminal sessions."
  },
  {
    id: 34,
    question: "What is the architectural relationship between a database management system (DBMS) and the operating system (OS)?",
    options: [
      "Mutual Invocation",
      "Database system calls the operating system",
      "The operating system calls the database management system.",
      "Concurrent operation"
    ],
    correctAnswer: 1,
    category: "Architecture & Engines",
    difficulty: "Foundation",
    keyConcept: "DBMS and Operating System Hierarchy",
    explanation: "A DBMS runs as user-space processes on top of the OS, issuing system calls (syscalls) to the kernel for memory allocation, process/thread scheduling, network sockets, and file I/O."
  },
  {
    id: 35,
    question: "In the openGauss database, what is the maximum storage capacity of a single table?",
    options: [
      "8T",
      "4T",
      "16T",
      "32T"
    ],
    correctAnswer: 3,
    category: "Storage & Data Types",
    difficulty: "Foundation",
    keyConcept: "openGauss Storage Capacity Specifications",
    explanation: "In openGauss, the maximum supported storage capacity of a single relational table is 32 Terabytes (32T)."
  },
  {
    id: 36,
    question: "Regarding the Second Normal Form (2NF) of database relational modeling, which of the following statements is incorrect?",
    options: [
      "When a table has a composite primary key, other non-primary key fields can partially depend on a field in the composite key.",
      "2NF is built on the foundation of 1NF, meaning that to satisfy 2NF, 1NF must first be satisfied.",
      "2NF requires that each instance or row in a database table must be uniquely distinguishable.",
      "2NF emphasizes full functional dependency."
    ],
    correctAnswer: 0,
    category: "SQL & Schema Operations",
    difficulty: "Core",
    keyConcept: "Database Normalization: Second Normal Form (2NF)",
    explanation: "2NF strictly forbids partial functional dependencies! Every non-key attribute must be fully functionally dependent on the entire composite primary key."
  },
  {
    id: 37,
    question: "An application administrator can set parameters using the gs_guc tool. In gs_guc commands, what does the '-N all' option represent?",
    options: [
      "Represents all hosts in openGauss",
      "Represents all instances of the host.",
      "Indicates that clients are allowed to connect to any database.",
      "Indicates the statement that needs to be added to pg_hba.conf."
    ],
    correctAnswer: 0,
    category: "Database Tools & O&M",
    difficulty: "Foundation",
    keyConcept: "gs_guc Parameter Scope Flags",
    explanation: "In gs_guc, '-N all' signifies that the configuration command applies to all host nodes in the openGauss cluster environment."
  },
  {
    id: 38,
    question: "After enabling the separation of duties (Three-Power Separation) in GaussDB (for openGauss), which administrator can view the audit logs?",
    options: [
      "Security Administrator",
      "Storage Administrator",
      "Audit Administrator",
      "System Administrator"
    ],
    correctAnswer: 2,
    category: "Security & Access Control",
    difficulty: "Core",
    keyConcept: "Separation of Duties (Three Powers Separation)",
    explanation: "When separation of duties is enabled, the system enforces three independent roles: System Admin (OM operations), Security Admin (access control/RBAC), and Audit Admin (sole authority to review and maintain audit records)."
  },
  {
    id: 39,
    question: "The WAL (Write-Ahead Log) log is vital in openGauss for crash recovery and replication. Which of the following is the default directory where WAL logs are located?",
    options: [
      "pg_log",
      "pg_xlog",
      "pg_audit",
      "global"
    ],
    correctAnswer: 1,
    category: "Architecture & Engines",
    difficulty: "Foundation",
    keyConcept: "openGauss Data Directory: WAL Storage",
    explanation: "openGauss stores write-ahead transaction log segments in the 'pg_xlog' directory within the database data directory ($PGDATA/pg_xlog)."
  },
  {
    id: 40,
    question: "As shown in the table illustration below, which of the following is the contiguous physical layout of this columnar table on hard disk storage?",
    options: [
      "1 845 2 3 1...3 872 4 4 1...2 851 5 2 2",
      "1 2 1...3 2 4...2 5 4...845 851 872...1 2 3",
      "1 2 3...845 851 872...2 5 4...3 2 4...1 2 1",
      "1 845 2 3 1...2 851 5 2 2...3 872 4 4 1"
    ],
    correctAnswer: 2,
    category: "Storage & Data Types",
    difficulty: "Advanced",
    keyConcept: "Columnar Storage Physical Data Layout",
    explanation: "In a column-oriented storage engine, data is organized and stored by column rather than row. The physical sequence arranges all elements of Column 1 first (1, 2, 3), followed by Column 2 (845, 851, 872), then Column 3 (2, 5, 4), Column 4 (3, 2, 4), and Column 5 (1, 2, 1).",
    tableVisual: {
      title: "Sample Relational Table (5 Columns x 3 Rows)",
      headers: ["Col 1 (ID)", "Col 2 (Code)", "Col 3 (Qty)", "Col 4 (Dept)", "Col 5 (Status)"],
      rows: [
        [1, 845, 2, 3, 1],
        [2, 851, 5, 2, 2],
        [3, 872, 4, 4, 1]
      ]
    }
  },
  {
    id: 41,
    question: "What deployment methods does GaussDB 100 support?",
    options: [
      "Standalone deployment",
      "Primary and backup deployment",
      "Decentralized Deployment",
      "All of the above are correct."
    ],
    correctAnswer: 3,
    category: "Deployment & High Availability",
    difficulty: "Foundation",
    keyConcept: "GaussDB 100 Supported Topologies",
    explanation: "GaussDB 100 supports single-node standalone deployment, primary-standby high availability deployment, as well as distributed / decentralized cluster deployment modes."
  },
  {
    id: 42,
    question: "openGauss allows users to create scheduled tasks. When a task expires, it will be executed and update the task status in which of the following system tables?",
    options: [
      "PG_EXTENSION",
      "PG_DESCRIPTION",
      "PG_CONSTRAINT",
      "PG_JOB"
    ],
    correctAnswer: 3,
    category: "Database Tools & O&M",
    difficulty: "Foundation",
    keyConcept: "Scheduled Tasks System Catalog: PG_JOB",
    explanation: "The system table PG_JOB tracks scheduled task configurations, execution schedules, intervals, and current job completion status."
  },
  {
    id: 43,
    question: "openGauss creates row-based tables by default. Which of the following clauses is required to create a columnstore table?",
    options: [
      "(ORIENTATION = COLUMN)",
      "WITH (COLMN)",
      "WITH (TYPE=COLUMN)",
      "WITH (ORIENTATION = COLUMN)"
    ],
    correctAnswer: 3,
    category: "SQL & Schema Operations",
    difficulty: "Foundation",
    keyConcept: "DDL Columnar Table Creation Syntax",
    explanation: "To create a column-oriented table in openGauss, append 'WITH (ORIENTATION = COLUMN)' to the CREATE TABLE statement."
  },
  {
    id: 44,
    question: "The openGauss database supports importing and exporting data using the meta-command \\copy in gsql. If binary format is required for storage and retrieval, which format option must be specified?",
    options: [
      "TEXT",
      "CSV",
      "BINARY",
      "FIXED"
    ],
    correctAnswer: 2,
    category: "Database Tools & O&M",
    difficulty: "Foundation",
    keyConcept: "\\copy Data Formats",
    explanation: "The \\copy command supports TEXT, CSV, and BINARY format options. BINARY transfers data in raw internal format without textual parsing overhead."
  },
  {
    id: 45,
    question: "Regarding the compatibility of openGauss and PostgreSQL database clients and standard interfaces, which of the following statements is correct?",
    options: [
      "openGauss is compatible with PSQL clients.",
      "openGauss is incompatible with the PostgreSQL standard interface.",
      "openGauss is compatible with the PostgreSQL standard interface.",
      "openGauss is incompatible with PSQL clients."
    ],
    correctAnswer: 2,
    category: "Architecture & Engines",
    difficulty: "Foundation",
    keyConcept: "PostgreSQL Standard Interface Compatibility",
    explanation: "openGauss adheres to standard PostgreSQL programming interfaces (JDBC, ODBC, Libpq protocol specifications) to facilitate application ecosystem interoperability."
  },
  {
    id: 46,
    question: "openGauss provides an interactive command-line database connection tool to connect to the server, query, and manage it. Which connection tool is native to openGauss?",
    options: [
      "gsql",
      "mysql",
      "sqlplus",
      "psql"
    ],
    correctAnswer: 0,
    category: "Database Tools & O&M",
    difficulty: "Foundation",
    keyConcept: "openGauss Native Client Tool: gsql",
    explanation: "gsql is the official command-line client utility shipped with openGauss for interactive SQL execution, meta-commands, and administration."
  },
  {
    id: 47,
    question: "Which of the following integer types requires 1 byte of storage?",
    options: [
      "TINYINT",
      "INTEGER",
      "BIGINT",
      "SMALLINT"
    ],
    correctAnswer: 0,
    category: "Storage & Data Types",
    difficulty: "Foundation",
    keyConcept: "Numeric Data Type Storage Footprints",
    explanation: "TINYINT (INT1) consumes exactly 1 byte (range 0 to 255 or -128 to 127). SMALLINT consumes 2 bytes, INTEGER consumes 4 bytes, and BIGINT consumes 8 bytes."
  },
  {
    id: 48,
    question: "Which of the following tools is used to modify parameter values in openGauss configuration files (postgresql.conf and pg_hba.conf) across instances and standalone mode?",
    options: [
      "gsql",
      "gs_guc",
      "gs_checkos",
      "gs_om"
    ],
    correctAnswer: 1,
    category: "Database Tools & O&M",
    difficulty: "Foundation",
    keyConcept: "openGauss Parameter Configuration Utility: gs_guc",
    explanation: "gs_guc (Grand Unified Configuration) is the specialized management utility used to set, reload, and check parameters in postgresql.conf and client permissions in pg_hba.conf."
  },
  {
    id: 49,
    question: "Which of the following commands can create an independent private user named 'joe' in openGauss?",
    options: [
      "CREATE USER joe IDENTIFIED BY 'Password@123';",
      "CREATE USER joe WITH INDEPENDENT IDENTIFIED BY 'Password@123';",
      "CREATE USER joe PASSWORD 'Password@123';",
      "CREATE USER joe WITH CREATEDB PASSWORD 'Password@123';"
    ],
    correctAnswer: 1,
    category: "Security & Access Control",
    difficulty: "Core",
    keyConcept: "Independent / Private User Creation (WITH INDEPENDENT)",
    explanation: "In openGauss, the 'WITH INDEPENDENT' clause creates a private user whose schema and table objects cannot be accessed or altered even by database administrators (sysadmins)."
  },
  {
    id: 50,
    question: "In most Linux operating system distributions, which of the following is classified as a block device?",
    options: [
      "Serial port",
      "Hard drive",
      "Virtual Terminal",
      "Printer"
    ],
    correctAnswer: 1,
    category: "Architecture & Engines",
    difficulty: "Foundation",
    keyConcept: "Linux Storage Subsystems: Block Devices",
    explanation: "Hard drives, SSDs, and NVMe drives are block devices (prefixed by 'b' in ls -l) because they transfer data in fixed-size blocks and support random access. Terminals, serial ports, and printers are character devices."
  }
];

export const CATEGORIES = [
  "Architecture & Engines",
  "Deployment & High Availability",
  "SQL & Schema Operations",
  "Database Tools & O&M",
  "Security & Access Control",
  "Storage & Data Types"
] as const;
