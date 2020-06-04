////////////////////////////////////////////////////////////////////////////
//
// Copyright 2016 Realm Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
////////////////////////////////////////////////////////////////////////////

/* eslint getter-return: "off", no-dupe-class-members: "off" */

/**
 * This describes the different options used to create a {@link Realm} instance with Realm Platform synchronization.
 * @typedef {Object} Realm.Sync~SyncConfiguration
 * @property {Realm.Sync.User} user - A {@link Realm.Sync.User} object obtained by calling `Realm.Sync.User.login`.
 * @property {string} url - A `string` which contains a valid Realm Sync url.
 * @property {function} [error] - A callback function which is called in error situations.
 *    The `error` callback can take up to five optional arguments: `name`, `message`, `isFatal`,
 *    `category`, and `code`.
 *
 * @property {Object} [custom_http_headers] - A map (string, string) of custom HTTP headers.
 * @property {string} [clientResyncMode] A Client Resync is triggered if the device and server cannot agree on a common shared history
 *     for the Realm file, thus making it impossible for the device to upload or receive any changes.
 *     This can happen if the server is rolled back or restored from backup. Just having the device offline will not trigger a Client Resync.
 *     The three different modes are `'recover'`, `'discard'`, and `'manual'` with `'recover'` as the default value.
 * @property {Realm.Sync~OpenRealmBehaviorConfiguration} [newRealmFileBehavior] - Whether to create a new file and sync in background or wait for the file to be synced.
       If not set, the Realm will be downloaded before opened.
 * @property {Realm.Sync~OpenRealmBehaviorConfiguration} [existingRealmFileBehavior] - Whether to open existing file and sync in background or wait for the sync of the
 *    file to complete and then open. If not set, the Realm will be downloaded before opened.
 */

/**
 * This describes the client resync modes.
 * @typedef {("recover"|"discard"|"manual")} Realm.Sync~ClientResyncMode
 * @property "recover" - Realm will compare the local Realm with the Realm on the server and automatically transfer
 *     any changes from the local Realm that makes sense to the Realm provided by the server.
 *     This is the default mode for fully synchronized Realms. It is not yet supported by query-based Realms.
 * @property "discard" - The local Realm will be discarded and replaced with the server side Realm.
 *     All local changes will be lost. This mode is not yet supported by query-based Realms.
 * @property "manual" - A manual Client Resync is also known as a Client Reset. An error will be thrown.
 *     See also {@link Realm.Sync.initiateClientReset}.
 */

/**
 * This describes the different options used when adding a Global Notifier listener.
 * @typedef {Object} Realm.Sync~RealmListenerConfiguration
 * @property {string} serverUrl - The sync server to listen to.
 * @property {SyncUser} adminUser - an admin user obtained by calling {@linkcode Realm.Sync.User.login|User.login} with admin credentials.
 * @property {string} filterRegex - A regular expression used to determine which changed Realms should trigger events. Use `.*` to match all Realms.
 */

/**
 * Specify how to open a synced Realm.
 *
 * @typedef {Object} Realm.Sync~OpenRealmBehaviorConfiguration
 * @property {string} type - how to open a Realm - 'downloadBeforeOpen' to wait for download to complete or 'openImmediately' to open the local Realm
 * @property {number} [timeOut] - how long to wait for a download (in ms). Default: infinity
 * @property {string} [timeOutBehavior] - what to do when download times out - 'openLocalRealm' to open the local Realm or 'throwException' to throw an exception.
 * @see {@link Realm.Sync~openLocalRealmBehavior}
 * @see {@link Realm.Sync~downloadBeforeOpenBehavior}
 */

/**
 * The default behavior settings if you want to open a synchronized Realm immediately and start working on it.
 * If this is the first time you open the Realm, it will be empty while the server data is being downloaded
 * in the background.
 *
 * @typedef {Realm.Sync~OpenRealmBehaviorConfiguration} Realm.Sync~openLocalRealmBehavior
 */

/**
 * The default behavior settings if you want to wait for downloading a synchronized Realm to complete before opening it.
 *
 * @typedef {Realm.Sync~OpenRealmBehaviorConfiguration} Realm.Sync~downloadBeforeOpenBehavior
 */

/**
 * When opening a Realm created with Realm Mobile Platform v1.x, it is automatically
 * migrated to the v2.x format. In case this migration
 * is not possible, an exception is thrown. The exception´s `message` property will be equal
 * to `IncompatibleSyncedRealmException`. The Realm is backed up, and the property `configuration`
 * is a {Realm~Configuration} which refers to it. You can open it as a local, read-only Realm, and
 * copy objects to a new synced Realm.
 *
 * @memberof Realm
 */
class Sync {

    /**
     * Calling this method will force Realm to attempt to reconnect to the server immediately.
     *
     * Realm will reconnect automatically, but by using exponential backoff. This means that if the device is offline for
     * a long time, restoring the connection after it comes back online can take longer than expected. In situations
     * where it is possible to detect the network condition (e.g. Airplane mode). Manually calling this method can
     * provide a smoother user experience.
     */
    static reconnect() { }

    /**
     * Set the sync log level.
     * @param {Realm.Sync~LogLevel} level - The new log level.
     */
    static setLogLevel(level) { }

    /**
     * Enable multiplexing multiple sync sessions over a single connection. 
     * When having a lot of synchronized realms open the system might run out of file 
     * descriptors because of all the open sockets to the server. Session multiplexing 
     * is designed to alleviate that, but it might not work with a server configured with 
     * fail-over. Only use if you're seeing errors about reaching the file descriptor limit
     * and you know you are using many sync sessions.
     */
    static enableSessionMultiplexing() { }

    /**
     * A callback passed to `Realm.Sync.setLogger` when instrumenting the Realm Sync client with a custom logger.
     * @callback Realm.Sync~logCallback
     * @param {number} level The level of the log entry between 0 and 8 inclusively.
     * Use this as an index into `['all', 'trace', 'debug', 'detail', 'info', 'warn', 'error', 'fatal', 'off']` to get the name of the level.
     * @param {string} message The message of the log entry.
     */

    /**
     * Capture the sync client's log.
     * @param {Realm.Sync~logCallback} logger - The log callback.
     */
    static setLogger(logger) { }

    /**
     * Set the application part of the User-Agent string that will be sent to the Realm Object Server when a session
     * is created.
     *
     * This method can only be called up to the point where the first Realm is opened. After that, the User-Agent
     * can no longer be changed.
     * @param {string} the user agent description
     */
    static setUserAgent(userAgent) { }

    /**
     * Initiate a client reset. The Realm must be closed prior to the reset.
     *
     * @param {string} [path] - The path to the Realm to reset.
     * Throws error if reset is not possible.
     * @example
     * {
     *   const config = { sync: { user, url: 'realm://localhost:9080/~/myrealm' } };
     *   config.sync.error = (sender, error) => {
     *     if (error.name === 'ClientReset') {
     *       Realm.Sync.initiateClientReset(original_path);
     *       // copy required objects from Realm at error.config.path
     *     }
     *   }
     * }
     */
    static initiateClientReset(path) { }

    /**
     * Returns `true` if Realm still has a reference to any sync sessions regardless of their state.
     * If `false` is returned it means that no sessions currently exist.
     */
    static _hasExistingSessions() { }
}

/**
 * @typedef Realm.Sync~LogLevel
 * @type {("all"|"trace"|"debug"|"detail"|"info"|"warn"|"error"|"fatal"|"off")}
 */

/**
 * Class that describes authentication errors in the Realm Object Server
 * @memberof Realm.Sync
 */
class AuthError extends Error {
    /**
     * The numerical code for this error.
     * @type {number}
     */
    get code() { }

    /**
     * The unique help URI that describes this error.
     * @type {string}
     */
    get type() { }
}

/**
 * Describes an error when an incompatible synced Realm is opened. The old version of the Realm can be accessed in readonly mode using the configuration() member
 * @memberof Realm.Sync
 */
class IncompatibleSyncedRealmError {
    /**
     * The name of the error is 'IncompatibleSyncedRealmError'
     */
    get name() { }

    /**
     * The {Realm~Configuration} of the backed up Realm.
     * @type {Realm~Configuration}
     */
    get configuration() { }
}

/**
 * Class for creating user credentials
 * @memberof Realm.Sync
 */
class Credentials {
    /**
     * Creates credentials based on a login with a username and a password.
     * @param {string} username The username of the user.
     * @param {string} password The user's password.
     * @param {boolean} [createUser] optional - `true` if the user should be created, `false` otherwise. If
     * `true` is provided and the user exists, or `false` is provided and the user doesn't exist,
     * an error will be thrown. If not specified, if the user doesn't exist, they will be created,
     * otherwise, they'll be logged in if the password matches.
     * @return {Credentials} An instance of `Credentials` that can be used in {@linkcode Realm.Sync.User.login|User.login}.
     */
    static usernamePassword(username, password, createUser) { }

    /**
     * Creates credentials based on a Facebook login.
     * @param {string} token A Facebook authentication token, obtained by logging into Facebook..
     * @return {Credentials} An instance of `Credentials` that can be used in {@linkcode Realm.Sync.User.login|User.login}.
     */
    static facebook(token) { }

    /**
     * Creates credentials based on a Google login.
     * @param {string} token A Google authentication token, obtained by logging into Google..
     * @return {Credentials} An instance of `Credentials` that can be used in {@linkcode Realm.Sync.User.login|User.login}.
     */
    static google(token) { }

    /**
     * Creates credentials for an anonymous user. These can only be used once - using them a second
     * time will result in a different user being logged in. If you need to get a user that has already logged
     * in with the Anonymous credentials, use {@linkcode Realm.Sync.User.current|User.current} or {@linkcode Realm.Sync.User.all|User.all}
     * @return {Credentials} An instance of `Credentials` that can be used in {@linkcode Realm.Sync.User.login|User.login}.
     */
    static anonymous() { }

    /**
     * Creates credentials based on a login with a nickname. If multiple users try to login
     * with the same nickname, they'll get the same underlying sync user.
     * @param {string} value The nickname of the user.
     * @param {boolean} [isAdmin] An optional parameter controlling whether the user is admin. Default is `false`.
     * @return {Credentials} An instance of `Credentials` that can be used in {@linkcode Realm.Sync.User.login|User.login}.
     */
    static nickname(value, isAdmin) { }

    /**
     * Creates credentials based on an Active Directory login.
     * @param {string} token An access token, obtained by logging into Azure Active Directory.
     * @return {Credentials} An instance of `Credentials` that can be used in {@linkcode Realm.Sync.User.login|User.login}.
     */
    static azureAD(token) { }

    /**
     * Creates credentials based on a JWT login.
     * @param {string} token A JSON Web Token, that will be validated against the server's configured rules.
     * @param {string} [providerName] The name of the provider as configured in the Realm Object. If not specified, the default
     * name - `jwt` - will be used.
     * @return {Credentials} An instance of `Credentials` that can be used in {@linkcode Realm.Sync.User.login|User.login}.
     */
    static jwt(token, providerName) { }

    /**
     * Creates credentials based on an admin token. Using this credential will not contact the Realm Object Server.
     * @param {string} token The admin token.
     * @return {Credentials} An instance of `Credentials` that can be used in {@linkcode Realm.Sync.User.login|User.login}.
     */
    static adminToken(token) { }

    /**
     * Creates credentials with a custom provider and user identifier.
     * @param {string} providerName Provider used to verify the credentials.
     * @param {string} token A string identifying the user. Usually an identity token or a username.
     * @param {userInfo} userInfo Data describing the user further or null if the user does not have any extra data.
     * The data will be serialized to JSON, so all values must be mappable to a valid JSON data type.
     * @return {Credentials} An instance of `Credentials` that can be used in {@linkcode Realm.Sync.User.login|User.login}.
     */
    static custom(providerName, token, userInfo) { }


    /**
     * Gets the identity provider for the credentials.
     * @returns {string} The identity provider, such as Google, Facebook, etc.
     */
    get identityProvider() { }

    /**
     * Gets the access token.
     * @returns {string}
     */
    get token() { }

    /**
     * Gets additional user information associated with the credentials.
     * @returns {object} A dictionary, containing the additional information.
     */
    get userInfo() { }
}

/**
 * Class for managing Sync users.
 * @memberof Realm.Sync
 */
class User {
    /**
     * Logs the user in to the Realm Object Server.
     * @param {string} server The url of the server that the user is authenticated against.
     * @param {Credentials} credentials The credentials to use for authentication. Obtain them by calling one of
     * the {@linkcode Realm.Sync.Credentials|Credentials} static methods.
     * @return {Promise<User> | User} A {@linkcode Realm.Sync.User|User} object if the credentials are
     * {@linkcode Realm.Sync.Credentials.adminToken|adminToken}, {@link Realm.Sync.User|`Promise<User>`} otherwise.
     */
    static login(server, credentials) { }

    /**
     * Request a password reset email to be sent to a user's email.
     * This will not throw an exception, even if the email doesn't belong to a Realm Object Server user.
     *
     * This can only be used for users who authenticated with the 'password' provider, and passed a valid email address as a username.
     *
     * @param {string} server - authentication server
     * @param {string} email - The email that corresponds to the user's username.
     * @return {Promise<void>} A promise which is resolved when the request has been sent.
     */
    static requestPasswordReset(server, email) { }

    /**
     * Complete the password reset flow by using the reset token sent to the user's email as a one-time authorization token to change the password.
     *
     * By default, Realm Object Server will send a link to the user's email that will redirect to a webpage where they can enter their new password.
     * If you wish to provide a native UX, you may wish to modify the password authentication provider to use a custom URL with deep linking, so you can
     * open the app, extract the token, and navigate to a view that allows to change the password within the app.
     *
     * @param {string} server - authentication server
     * @param {string} resetToken - The token that was sent to the user's email address.
     * @param {string} newPassword - The user's new password.
     * @return {Promise<void>} A promise which is resolved when the request has been sent.
     */
    static completePasswordReset(server, resetToken, newPassword) { }

    /**
     * Request an email confirmation email to be sent to a user's email.
     * This will not throw an exception, even if the email doesn't belong to a Realm Object Server user.
     *
     * @param {string} server - authentication server
     * @param {string} email - The email that corresponds to the user's username.
     * @return {Promise<void>} A promise which is resolved when the request has been sent.
     */
    static requestEmailConfirmation(server, email) { }

    /**
     * Complete the email confirmation flow by using the confirmation token sent to the user's email as a one-time authorization token to confirm their email.
     *
     * By default, Realm Object Server will send a link to the user's email that will redirect to a webpage where they can enter their new password.
     * If you wish to provide a native UX, you may wish to modify the password authentication provider to use a custom URL with deep linking, so you can
     * open the app, extract the token, and navigate to a view that allows to confirm the email within the app.
     *
     * @param {string} server - authentication server
     * @param {string} confirmationToken - The token that was sent to the user's email address.
     * @return {Promise<void>} A promise which is resolved when the request has been sent.
     */
    static confirmEmail(server, confirmationToken) { }

    /**
     * Creates a new sync user instance from the serialized representation.
     * @param {object} serialized - the serialized version of the user, obtained by calling {@link User#serialize}.
     */
    static deserialize(serialized) { }

    /**
     * A dictionary containing users that are currently logged in.
     * The keys in the dictionary are user identities, values are corresponding User objects.
     * @type {object}
     */
    static get all() { }

    /**
     * Get the currently logged in user.
     * Throws error if > 1 user logged in, returns undefined if no users logged in.
     * @type {User}
     */
    static get current() { }

    /**
     * Gets the server URL that was used for authentication.
     * @type {string}
     */
    get server() { }

    /**
     * Gets the identity of this user on the Realm Object Server.
     * The identity is a guaranteed to be unique among all users on the Realm Object Server.
     * @type {string}
     */
    get identity() { }

    /**
     * Gets this user's refresh token. This is the user's credential for accessing the Realm
     * Object Server and should be treated as sensitive data.
     * @type {string}
     */
    get token() { }

    /**
     * Gets this user's associated custom data. This is application-specific data provided by the server.
     * @type {object?}
     */
    get customData() { }

    /**
     * Calls the named server function as this user.
     * @param {string} name - name of the function to call
     * @param {any[]} args - list of arguments to pass
     */
    call_function(name, args) { }
    
    /**
     * Convenience wrapper around `call_function(name, [args])`
     *
     * @example
     * // These are all equivalent:
     * await user.call_function("do_thing", [a1, a2, a3]);
     * await user.functions.do_thing(a1, a2, a3);
     * await user.functions["do_thing"](a1, a2, a3);
     *
     * @example
     * // It it legal to store the functions as first-class values:
     * const do_thing = user.functions.do_thing;
     * await do_thing(a1);
     * await do_thing(a2);
     */   
    get functions() { }

    /**
     * Creates the configuration object required to open a synchronized Realm.
     *
     * @param {Realm.PartialConfiguration} config - optional parameters that should override any default settings.
     * @returns {Realm.Configuration} the full Realm configuration
     * @since 3.0.0
     */
    createConfiguration(config) { }

    /**
     * Serializes a user to an object, that can be persisted or passed to another component to create a new instance
     * by calling {@link User.deserialize}. The serialized user instance includes the user's refresh token and should
     * be treated as sensitive data.
     * @returns {object} an object, containing the user identity, server url, and refresh token.
     */
    serialize() { }

    /**
     * Logs out the user from the Realm Object Server. Once the Object Server has confirmed the logout the user
     * credentials will be deleted from this device.
     * @return {Promise<void>} A promise which is resolved when the user has logged out both locally and on the server.
     */
    logout() { }

    /**
     * Get account information for a user. (requires administrator privilidges)
     * @param {string} provider - the provider to query for user account information (ex. 'password')
     * @param {string} username - the target username which account information should be retrieved
     * @returns {Promise} - a promise that will be resolved with the retrieved account information as JSON object
     * @example
     * {
     *   "user_id": "f7a8d2ad9768d73d9d161723935f6f95",
     *   "accounts": [
     *     {
     *       "provider": "password",
     *       "provider_id": "user@email.com"
     *     }
     *   ],
     *   "metadata":[]
     * }
     */
    retrieveAccount(provider, username) { }
}

/**
 * An object encapsulating a Realm Object Server session. Sessions represent the communication between the
 * client (and a local Realm file on disk), and the server (and a remote Realm at a given URL stored on a Realm Object Server).
 * Sessions are always created by the SDK and vended out through various APIs. The lifespans of sessions
 * associated with Realms are managed automatically.
 * @memberof Realm.Sync
 */
class Session {
    /**
     * Gets the Sync-part of the configuration that the corresponding Realm was
     * constructed with.
     * @type {object}
     */
    get config() { }

    /**
     * Gets the User that this session was created with.
     * @type {User}
     */
    get user() { }

    /**
     * Gets the URL of the Realm Object Server that this session is connected to.
     * @type {string}
     */
    get url() { }

    /**
     * Gets the current state of the session.
     * Can be either:
     *  - "active": The session is connected to the Realm Object Server and is actively transferring data.
     *  - "inactive": The session is not currently communicating with the Realm Object Server.
     *  - "invalid": A non-recoverable error has occurred, and this session is semantically invalid. A new session should be created.
     * @type {string}
     */
    get state() { }

    /**
     * Register a progress notification callback on a session object
     * @param {string} direction - The progress direction to register for.
     * Can be either:
     *  - `download` - report download progress
     *  - `upload` - report upload progress
     * @param {string} mode - The progress notification mode to use for the registration.
     * Can be either:
     *  - `reportIndefinitely` - the registration will stay active until the callback is unregistered
     *  - `forCurrentlyOutstandingWork` - the registration will be active until only the currently transferable bytes are synced
     * @param {callback(transferred, transferable)} callback - called with the following arguments:
     *   - `transferred` - the current number of bytes already transferred
     *   - `transferable` - the total number of transferable bytes (the number of bytes already transferred plus the number of bytes pending transfer)
     */
    addProgressNotification(direction, mode, progressCallback) { }

    /** Unregister a progress notification callback that was previously registered with addProgressNotification.
     * Calling the function multiple times with the same callback is ignored.
    * @param {callback(transferred, transferable)} callback - a previously registered progress callback
    */
    removeProgressNotification(progressCallback) { }

    /**
     * Registers a connection notification on the session object. This will be notified about changes to the
     * underlying connection to the Realm Object Server.
     *
     * @param {callback(newState, oldState)} callback - called with the following arguments:
     *   - `newState` - the new state of the connection
     *   - `oldState` - the state the connection transitioned from.
     */
    addConnectionNotification(connectionCallback) { }

    /**
     * Unregister a state notification callback that was previously registered with addStateNotification.
     * Calling the function multiple times with the same callback is ignored.
     *
     * @param {callback(oldState, newState)} callback - a previously registered state callback.
     */
    removeConnectionNotification(connectionCallback) { }

    /**
     * Gets the current state of the connection to the server. Multiple sessions might share the same underlying
     * connection. In that case, any connection change is sent to all sessions.
     *
     * Can be either:
     *  - Realm.Sync.ConnectionState.Disconnected: No connection to the server is available.
     *  - Realm.Sync.ConnectionState.Connecting: An attempt to connect to the server is in progress.
     *  - Realm.Sync.ConnectionState.Connected: The connection to the server is active and data can be synchronized.
     *
     * Data will only be synchronized with the Realm ObjectServer if this method returns `Connected` and `state()`
     * returns `Active` or `Dying`.
     *
     * @type {string}
     */
    connectionState() { }

    /**
     * Returns `true` if the session is currently active and connected to the server, `false` if not.
     *
     * @type {boolean}
     */
    isConnected() { }

    /**
     * Resumes a sync session that has been paused.
     *
     * This method is asynchronous so in order to know when the session has started you will need
     * to add a connection notification with `addConnectionNotification`.
     *
     * This method is idempotent so it will be a no-op if the session is already started.
     */
    resume() { }

    /**
     * Pause a sync session.
     *
     * This method is asynchronous so in order to know when the session has started you will need
     * to add a connection notification with `addConnectionNotification`.
     *
     * This method is idempotent so it will be a no-op if the session is already paused.
     */
    pause() { }

    /**
     * This method returns a promise that does not resolve successfully until all known local changes have been uploaded
     * to the server or the specified timeout is hit in which case it will be rejected. If the method times out, the upload
     * will still continue in the background.
     *
     * This method cannot be called before the Realm has been opened.
     *
     * @param timeout maximum amount of time to wait in milliseconds before the promise is rejected. If no timeout
     * is specified the method will wait forever.
     */
    uploadAllLocalChanges(timeoutMs) { }

    /**
     * This method returns a promise that does not resolve successfully until all known remote changes have been
     * downloaded and applied to the Realm or the specified timeout is hit in which case it will be rejected. If the method
     * times out, the download will still continue in the background.
     *
     * This method cannot be called before the Realm has been opened.
     *
     * @param timeout maximum amount of time to wait in milliseconds before the promise will be rejected. If no timeout
     * is specified the method will wait forever.
     */
    downloadAllServerChanges(timeoutMs) { }
}

/**
 * A Realm Worker can be used to process Sync events in multiple automatically-managed child processes.
 *
 * Similar to Web Workers, a Worker is initialized by passing it the name of a module which should be loaded in the new process.
 * The module should export a function for each even type it wishes to handle, which will be called when that event is emitted.
 *
 * Currently supported events:
 *
 *  * `'available'`: Emitted whenever there is a new Realm which has a virtual
 *    path matching the filter regex, either due to the Realm being newly created
 *    or the listener being added. The virtual path (i.e. the portion of the
 *    URL after the protocol and hostname) is passed as an argument.
 *  * `'change'`: Emitted whenever the data within a Realm matching the filter
 *    regex has changed. A [ChangeEvent]{@link Realm.Sync.ChangeEvent} argument
 *    is passed containing information about which Realm changed and what
 *    objects within the Realm changed.
 *  * `'delete'`: Emitted whenever a Realm matching the filter regex has been
 *    deleted from the server. The virtual path of the Realm being deleted is
 *    passed as an argument.
 *
 * Worker automatically spawns child processes as needed to handle events in
 * parallel (up to the limit specified in the `options` parameter). Events for
 * each specific Realm will be processes in serial in the order in which the
 * events occurred, but may not all be processed in the same child.
 *
 * @example
 * // my-worker.js
 * function onavailable(path) {
 *    console.log(`Realm available at ${path}`);
 * }
 *
 * function onchange(change) {
 *    console.log(`Realm at ${change.path} changed`);
 * }
 *
 * function ondelete(path) {
 *    console.log(`Realm at ${path} deleted`);
 * }
 *
 * module.exports = {onchange, oncavailable, ondelete};
 *
 * // server script
 * Realm.Sync.addListener(realmServerURL, adminUser, '.*', new Realm.Worker('my-worker'));
 *
 * @memberof Realm
 */
class Worker {
    /**
     * Create a new Worker which executes the given module.
     *
     * @param {string} moduleName - The module to load in the worker process.
     * @param {object} [options] - An object containing option properties to configure the worker.
     * Available properties are as follows:
     *
     * * `maxWorkers`: The maximum number of child processes to spawn. Defaults to `os.cpus().length`.
     * * `env`: An object containing environment variables to set for the child process.
     * * `execArgv`: Command-line arguments to pass to the `node` worker processes.
     */
    constructor(moduleName, options = {}) { }
}
