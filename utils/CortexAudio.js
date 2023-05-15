class CortexAudio {
  /**
   * @type {CortexAudio}
   * @private
   */
  static _internal_player = null

  /**
   * @type {string}
   * @private
   */
  static _internal_sfx_filepath = '@/assets/sfx'

  /**
   * @type {number}
   * @private
   */
  static _master_volume_in_percent = 1

  /**
   * @param {string} audio_path
   * @param {number} [volume=0.5]
   */
  constructor(audio_path, volume = 0.5) {
    /**
     * @type {string}
     * @private
     */
    this._audio_path = audio_path

    /**
     * @type {number}
     * @private
     */
    this._volume = volume

    /**
     * @type {HTMLAudioElement}
     * @private
     */
    this._audio = null

    /**
     * @type {number|null}
     * @private
     */
    this._playback_rate_max = null

    /**
     * @type {number|null}
     * @private
     */
    this._playback_rate_min = null
  }

  /**
   * @param {number} [volume]
   * @return {Promise<void>}
   */
  static playSfxBack(volume) {
    return CortexAudio._playSfx('rdr2_sfx_back.mp3', volume, true)
  }

  /**
   * @param {number} [volume=0.5]
   * @return {Promise<void>}
   */
  static playSfxNext(volume) {
    if (typeof volume !== 'number') {
      volume = 0.5
    }

    return CortexAudio._playSfx('rdr2_sfx_next.mp3', volume, true)
  }

  /**
   * @param {number} [volume=0.25]
   * @return {Promise<void>}
   */
  static playSfxUpDown(volume) {
    if (typeof volume !== 'number') {
      volume = 0.25
    }

    return CortexAudio._playSfx('rdr2_sfx_up-down.mp3', volume, true)
  }

  /**
   * @param {number} [volume]
   * @return {Promise<void>}
   */
  static playSfxShowMenu(volume) {
    return CortexAudio._playSfx('rdr2_sfx_show_menu.mp3', volume, true)
  }

  /**
   * @param {number} [volume]
   * @return {Promise<void>}
   */
  static playSfxIndexOpen(volume) {
    return CortexAudio._playSfx('rdr2_sfx_index_open.mp3', volume, true)
  }

  /**
   * @param {number} [volume]
   * @return {Promise<void>}
   */
  static playSfxIndexClose(volume) {
    return CortexAudio._playSfx('rdr2_sfx_index_close.mp3', volume, true)
  }

  /**
   * @param {number} [volume]
   * @return {Promise<void>}
   */
  static playSfxHideMenu1(volume) {
    return CortexAudio._playSfx('rdr2_sfx_hide_menu_01.mp3', volume, true)
  }

  /**
   * @param {number} [volume]
   * @return {Promise<void>}
   */
  static playSfxHideMenu2(volume) {
    return CortexAudio._playSfx('rdr2_sfx_hide_menu_02.mp3', volume, true)
  }

  /**
   * @param {number} [volume]
   * @return {Promise<void>}
   */
  static playSfxHideMenu3(volume) {
    return CortexAudio._playSfx('rdr2_sfx_hide_menu_03.mp3', volume, true)
  }

  /**
   * @param {string} filename
   * @param {number} [volume=0.5]
   * @param {boolean} [standalone=false]
   * @return {Promise<void>}
   * @private
   */
  static _playSfx(filename, volume = 0.5, standalone = false) {
    if (CortexAudio._internal_player === null) {
      CortexAudio._internal_player = new CortexAudio(CortexAudio._internal_sfx_filepath)
    }

    CortexAudio._internal_player.setVolume(volume)
    return CortexAudio._internal_player.playAudio(filename, standalone)
  }

  /**
   * @param {string} audio_path
   * @return {CortexAudio}
   */
  setAudioPath(audio_path) {
    this._audio_path = audio_path
    return this
  }

  /**
   * @param {number} volume
   * @return {CortexAudio}
   */
  setVolume(volume) {
    if (this._volume !== volume) {
      this._volume = volume

      if (this._audio !== null) {
        this._audio.volume = volume
      }
    }

    return this
  }

  /**
   * @param {string} filename
   * @return {Promise<string>}
   */
  loopAudio(filename) {
    return this.playAudio(filename, false, true)
  }

  /**
   * @param {number} min
   * @param {number} max
   * @return {this}
   */
  setRandomPlaybackRate(min, max) {
    this._playback_rate_min = min
    this._playback_rate_max = max
    return this
  }

  /**
   * @param {number} rate
   * @return {this}
   */
  setPlaybackRate(rate) {
    return this.setRandomPlaybackRate(rate, rate)
  }

  /**
   * @return {boolean}
   */
  hasPlaybackRate() {
    return (
      typeof this._playback_rate_min === 'number' && typeof this._playback_rate_max === 'number'
    )
  }

  /**
   * @return {number}
   */
  calculateRandomPlaybackRate() {
    return (
      Math.random() * (this._playback_rate_max - this._playback_rate_min) + this._playback_rate_min
    )
  }

  /**
   * @param {string} filename
   * @param {boolean} [prevent_reset=false]
   * @param {boolean} [loop=false]
   * @return {Promise<string>}
   */
  playAudio(filename, prevent_reset, loop) {
    prevent_reset = prevent_reset || false
    loop = loop || false

    if (false === prevent_reset) {
      this.resetAudio()
    }

    this._audio = new Audio(`${this._audio_path}${filename}`)

    this._audio.volume = this._volume * CortexAudio._master_volume_in_percent
    this._audio.loop = loop

    if (this.hasPlaybackRate()) {
      this._audio.preservesPitch = false
      this._audio.webkitPreservesPitch = false
      this._audio.mozPreservesPitch = false
      this._audio.playbackRate = this.calculateRandomPlaybackRate()
    }

    const ended_promise = new Promise((resolve) => {
      const on_ended = () => {
        this._audio.removeEventListener('ended', on_ended)
        resolve(filename)
      }

      this._audio.addEventListener('ended', on_ended)

      this._audio._fire_ended = on_ended

      return this._audio.play().catch((error) => {
        console.error(error)
        on_ended()
      })
    })

    return ended_promise
  }

  /**
   * @return {boolean}
   */
  isPlaying() {
    return this._audio !== null && false === this._audio.paused
  }

  /**
   * @protected
   */
  resetAudio() {
    if (this._audio) {
      this._audio.pause()
      this._audio.remove()
      delete this._audio
    }
  }

  /**
   * @param {boolean} [force_ended_event=false]
   */
  stop(force_ended_event) {
    if (this._audio) {
      if (false === this._audio.paused) {
        this._audio.pause()
        force_ended_event = true
      }

      if (force_ended_event) {
        this._audio._fire_ended()
      }

      this._audio.currentTime = 0
    }
  }

  /**
   * @return {number|boolean}
   */
  getDuration() {
    return this._audio.duration || false
  }

  /**
   * @return {number}
   */
  getCurrentTime() {
    return this._audio.currentTime || 0
  }

  /**
   * @return {number|boolean}
   */
  getDurationInPercent() {
    const duration = this.getDuration()
    const current_time = this.getCurrentTime()

    if (duration === false) {
      return false
    }

    const percent = current_time / duration

    return percent
  }

  /**
   * @param {number} volume_in_percent
   */
  static setMasterVolumeInPercent(volume_in_percent) {
    CortexAudio._master_volume_in_percent = volume_in_percent
  }

  static resetMasterVolumeInPercent() {
    CortexAudio._master_volume_in_percent = 1
  }
}

export { CortexAudio }
